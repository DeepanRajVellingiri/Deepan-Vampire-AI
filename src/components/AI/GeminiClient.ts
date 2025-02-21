import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyBLOSZO2rctTdxVYCIhhSkVDcpqd1fjFms';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export interface PermissionInfo {
  useCase: string;
  alternativePermission?: {
    name: string;
    description: string;
    reason: string;
  };
  codeSnippet: string;
  details: {
    scope: string;
    impact: string;
    considerations: string[];
  };
}

const defaultPermissionInfo: PermissionInfo = {
  useCase: "This permission allows access to specific Microsoft Graph API endpoints.",
  codeSnippet: `// Example usage with Microsoft Graph SDK
const graph = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');

const client = graph.Client.init({
  authProvider: (done) => {
    done(null, accessToken); // Replace with your auth logic
  }
});`,
  details: {
    scope: "Varies based on permission type (Delegated/Application)",
    impact: "Access to specific Graph API resources",
    considerations: [
      "Always follow the principle of least privilege",
      "Regularly review and audit permission usage",
      "Implement proper error handling"
    ]
  }
};

function sanitizeJsonString(str: string): string {
  // Remove any markdown code block markers
  str = str.replace(/```json\s*|\s*```/g, '');
  
  // Find the first { and last }
  const start = str.indexOf('{');
  const end = str.lastIndexOf('}');
  
  if (start === -1 || end === -1) {
    throw new Error('No valid JSON object found in response');
  }
  
  // Extract just the JSON object
  return str.slice(start, end + 1);
}

function validateAndNormalizeResponse(parsedResponse: any): PermissionInfo {
  if (!parsedResponse || typeof parsedResponse !== 'object') {
    throw new Error('Invalid response format');
  }

  // Validate and normalize each field with strong type checking
  const validatedResponse: PermissionInfo = {
    useCase: typeof parsedResponse.useCase === 'string' && parsedResponse.useCase.trim()
      ? parsedResponse.useCase
      : defaultPermissionInfo.useCase,
      
    codeSnippet: typeof parsedResponse.codeSnippet === 'string' && parsedResponse.codeSnippet.trim()
      ? parsedResponse.codeSnippet
      : defaultPermissionInfo.codeSnippet,
      
    details: {
      scope: typeof parsedResponse.details?.scope === 'string' && parsedResponse.details.scope.trim()
        ? parsedResponse.details.scope
        : defaultPermissionInfo.details.scope,
        
      impact: typeof parsedResponse.details?.impact === 'string' && parsedResponse.details.impact.trim()
        ? parsedResponse.details.impact
        : defaultPermissionInfo.details.impact,
        
      considerations: Array.isArray(parsedResponse.details?.considerations) 
        ? parsedResponse.details.considerations.filter(c => typeof c === 'string' && c.trim())
        : defaultPermissionInfo.details.considerations
    }
  };

  // Validate and normalize alternativePermission if present
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
    const prompt = `You are a Microsoft Graph API expert. Analyze the permission "${permission}" and provide information in the following JSON format:

{
  "useCase": "A clear, simple explanation of what this permission allows from a developer's perspective, focusing on practical usage",
  "alternativePermission": {
    "name": "Suggested lower-privilege permission name (if this is a write permission)",
    "description": "Brief description of the alternative",
    "reason": "Why this is a better choice for developers"
  },
  "codeSnippet": "A practical code example showing how to use this permission with the Microsoft Graph SDK",
  "details": {
    "scope": "Permission scope and boundaries in plain language",
    "impact": "What developers can do with this permission",
    "considerations": [
      "Security consideration 1",
      "Security consideration 2",
      "Security consideration 3"
    ]
  }
}

IMPORTANT: Respond ONLY with the JSON object, no additional text or formatting.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      // Clean and extract JSON from the response
      const cleanedJson = sanitizeJsonString(text);
      const parsedResponse = JSON.parse(cleanedJson);
      
      // Validate and normalize the response
      const validatedResponse = validateAndNormalizeResponse(parsedResponse);

      // Ensure code snippet includes SDK setup if not present
      if (!validatedResponse.codeSnippet.includes('microsoft-graph-client')) {
        validatedResponse.codeSnippet = `// Using @microsoft/microsoft-graph-client
const graph = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');

const client = graph.Client.init({
  authProvider: (done) => {
    done(null, accessToken); // Replace with your auth token
  }
});

// Example usage for ${permission}
${validatedResponse.codeSnippet}`;
      }

      return validatedResponse;
    } catch (error) {
      console.error('Error processing AI response:', error);
      // Return default info with specific permission name
      return {
        ...defaultPermissionInfo,
        useCase: `The ${permission} permission provides access to specific Microsoft Graph API functionality.`
      };
    }
  } catch (error) {
    console.error('Error fetching permission info:', error);
    // Return default info with specific permission name
    return {
      ...defaultPermissionInfo,
      useCase: `The ${permission} permission provides access to specific Microsoft Graph API functionality.`
    };
  }
}

export function isWritePermission(permission: string): boolean {
  return permission.toLowerCase().includes('write') || 
         permission.toLowerCase().includes('manage') ||
         permission.toLowerCase().includes('readwrite');
}