import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

const endpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT;
const azureApiKey = import.meta.env.VITE_AZURE_OPENAI_KEY;

const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));

export interface CodeSnippet {
  language: string;
  framework: string;
  code: string;
  description: string;
}

export interface PermissionInfo {
  useCase: string;
  alternativePermission?: {
    name: string;
    description: string;
    reason: string;
  };
  permissionTypes: {
    delegated?: {
      description: string;
      example: string;
    };
    application?: {
      description: string;
      example: string;
    };
  };
  codeSnippets: CodeSnippet[];
}

const defaultPermissionInfo: PermissionInfo = {
  useCase: "This permission allows access to specific Microsoft Graph API endpoints.",
  permissionTypes: {
    delegated: {
      description: "Access as signed-in user",
      example: "User accessing their own email"
    },
    application: {
      description: "Access without user",
      example: "Background email processing"
    }
  },
  codeSnippets: [
    {
      language: "typescript",
      framework: "Node.js",
      code: `// Using @microsoft/microsoft-graph-client
const graph = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');

const client = graph.Client.init({
  authProvider: (done) => {
    done(null, accessToken); // Replace with your auth token
  }
});`,
      description: "Basic Graph SDK initialization"
    }
  ]
};

function sanitizeJsonString(str: string): string {
  try {
    // Remove any markdown code block syntax
    str = str.replace(/```json\s*|\s*```/g, '');
    
    // Find the first { and last }
    const start = str.indexOf('{');
    const end = str.lastIndexOf('}');
    
    if (start === -1 || end === -1) {
      throw new Error('No valid JSON object found in response');
    }
    
    // Extract just the JSON object
    return str.slice(start, end + 1);
  } catch (error) {
    console.error('Error sanitizing JSON string:', error);
    throw error;
  }
}

function validateAndNormalizeResponse(parsedResponse: any): PermissionInfo {
  if (!parsedResponse || typeof parsedResponse !== 'object') {
    throw new Error('Invalid response format');
  }

  // Create a normalized response with defaults
  const validatedResponse: PermissionInfo = {
    useCase: typeof parsedResponse.useCase === 'string' && parsedResponse.useCase.trim()
      ? parsedResponse.useCase
      : defaultPermissionInfo.useCase,
      
    codeSnippets: Array.isArray(parsedResponse.codeSnippets) 
      ? parsedResponse.codeSnippets.map((snippet: any) => ({
          language: typeof snippet.language === 'string' ? snippet.language.toLowerCase() : 'typescript',
          framework: typeof snippet.framework === 'string' ? snippet.framework : 'Node.js',
          code: typeof snippet.code === 'string' ? snippet.code : defaultPermissionInfo.codeSnippets[0].code,
          description: typeof snippet.description === 'string' ? snippet.description : ''
        }))
      : defaultPermissionInfo.codeSnippets,
      
    permissionTypes: {
      delegated: parsedResponse.permissionTypes?.delegated ? {
        description: parsedResponse.permissionTypes.delegated.description || defaultPermissionInfo.permissionTypes.delegated!.description,
        example: parsedResponse.permissionTypes.delegated.example || defaultPermissionInfo.permissionTypes.delegated!.example
      } : defaultPermissionInfo.permissionTypes.delegated,
      
      application: parsedResponse.permissionTypes?.application ? {
        description: parsedResponse.permissionTypes.application.description || defaultPermissionInfo.permissionTypes.application!.description,
        example: parsedResponse.permissionTypes.application.example || defaultPermissionInfo.permissionTypes.application!.example
      } : defaultPermissionInfo.permissionTypes.application
    }
  };

  // Only add alternativePermission if it's a write permission and has valid data
  if (parsedResponse.alternativePermission && 
      typeof parsedResponse.alternativePermission === 'object' &&
      typeof parsedResponse.alternativePermission.name === 'string' &&
      parsedResponse.alternativePermission.name.trim()) {
    validatedResponse.alternativePermission = {
      name: parsedResponse.alternativePermission.name.trim(),
      description: typeof parsedResponse.alternativePermission.description === 'string' 
        ? parsedResponse.alternativePermission.description.trim()
        : '',
      reason: typeof parsedResponse.alternativePermission.reason === 'string'
        ? parsedResponse.alternativePermission.reason.trim()
        : ''
    };
  }

  return validatedResponse;
}

export async function getPermissionInfo(permission: string): Promise<PermissionInfo> {
  try {
    if (!permission) {
      throw new Error('Permission name is required');
    }

    const prompt = `You are a Microsoft Graph API expert. Analyze the permission "${permission}" and provide information in the following JSON format:

{
  "useCase": "A clear, simple explanation of what this permission allows from a developer's perspective",
  "alternativePermission": {
    "name": "Suggested lower-privilege permission name (if this is a write permission)",
    "description": "Brief description of the alternative",
    "reason": "Why this is a better choice for developers"
  },
  "permissionTypes": {
    "delegated": {
      "description": "Simple explanation of how this works with delegated auth",
      "example": "Real-world example of delegated use"
    },
    "application": {
      "description": "Simple explanation of how this works with app-only auth",
      "example": "Real-world example of application use"
    }
  },
  "codeSnippets": [
    {
      "language": "typescript",
      "framework": "Node.js",
      "code": "// Example code using this permission",
      "description": "Example using Microsoft Graph JavaScript SDK"
    }
  ]
}`;

    const messages = [
      { role: "system", content: "You are a Microsoft Graph API expert." },
      { role: "user", content: prompt }
    ];

    const result = await client.getChatCompletions("gpt-4", messages);
    const response = result.choices[0]?.message?.content;

    if (!response) {
      throw new Error('No response from AI model');
    }

    try {
      const cleanedJson = sanitizeJsonString(response);
      const parsedResponse = JSON.parse(cleanedJson);
      return validateAndNormalizeResponse(parsedResponse);
    } catch (error) {
      console.error('Error processing AI response:', error);
      // Return default info with custom use case for the specific permission
      return {
        ...defaultPermissionInfo,
        useCase: `The ${permission} permission provides access to specific Microsoft Graph API functionality. Please try again later for more detailed information.`
      };
    }
  } catch (error) {
    console.error('Error fetching permission info:', error);
    // Return default info with custom use case for the specific permission
    return {
      ...defaultPermissionInfo,
      useCase: `The ${permission} permission provides access to specific Microsoft Graph API functionality. Please try again later for more detailed information.`
    };
  }
}

export function isWritePermission(permission: string): boolean {
  return permission.toLowerCase().includes('write') || 
         permission.toLowerCase().includes('manage') ||
         permission.toLowerCase().includes('readwrite');
}