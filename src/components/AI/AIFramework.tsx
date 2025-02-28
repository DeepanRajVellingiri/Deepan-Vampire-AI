import { useState, useRef, useEffect } from 'react';
import { X, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface AIFrameworkProps {
  permission: string;
  onClose: () => void;
}

interface CodeSnippet {
  language: string;
  code: string;
  description?: string;
}

export function AIFramework({ permission, onClose }: AIFrameworkProps) {
  const [selectedFramework, setSelectedFramework] = useState('typescript');
  const [showFrameworkDropdown, setShowFrameworkDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const frameworks = [
    { id: 'typescript', name: 'TypeScript' },
    { id: 'csharp', name: 'C#' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'php', name: 'PHP' },
    { id: 'go', name: 'Go' }
  ];

  const codeSnippets: Record<string, CodeSnippet> = {
    typescript: {
      language: 'typescript',
      code: `// TypeScript example for ${permission}
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import { ClientSecretCredential } from "@azure/identity";

// Create an authentication provider
const credential = new ClientSecretCredential(
  "tenant-id",
  "client-id",
  "client-secret"
);
const authProvider = new TokenCredentialAuthenticationProvider(credential, {
  scopes: ["https://graph.microsoft.com/.default"]
});

// Initialize the Graph client
const graphClient = Client.initWithMiddleware({
  authProvider: authProvider
});

// Make a request to get the user's profile
async function getUserProfile() {
  try {
    const user = await graphClient.api('/me').get();
    return user;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
}`,
      description: 'Using Microsoft Graph JavaScript SDK with Azure Identity'
    },
    csharp: {
      language: 'csharp',
      code: `// C# example for ${permission}
using Azure.Identity;
using Microsoft.Graph;

// Create the Graph service client with a token credential
var credential = new ClientSecretCredential(
    tenantId: "YOUR_TENANT_ID",
    clientId: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET");

var graphClient = new GraphServiceClient(credential, new[] { "https://graph.microsoft.com/.default" });

// Make a request to get the user's profile
public async Task<User> GetUserProfileAsync()
{
    try
    {
        var user = await graphClient.Me
            .GetAsync();
        return user;
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error getting user profile: {ex.Message}");
        throw;
    }
}`,
      description: 'Using Microsoft Graph .NET SDK with Azure Identity'
    },
    python: {
      language: 'python',
      code: `# Python example for ${permission}
from azure.identity import ClientSecretCredential
from msgraph.core import GraphClient

# Create an authentication provider
credential = ClientSecretCredential(
    tenant_id="YOUR_TENANT_ID",
    client_id="YOUR_CLIENT_ID",
    client_secret="YOUR_CLIENT_SECRET"
)

# Initialize the Graph client
graph_client = GraphClient(credential=credential, scopes=["https://graph.microsoft.com/.default"])

# Make a request to get the user's profile
def get_user_profile():
    try:
        response = graph_client.get("/me")
        return response.json()
    except Exception as e:
        print(f"Error getting user profile: {str(e)}")
        raise`,
      description: 'Using Microsoft Graph Python SDK with Azure Identity'
    },
    java: {
      language: 'java',
      code: `// Java example for ${permission}
import com.azure.identity.ClientSecretCredential;
import com.azure.identity.ClientSecretCredentialBuilder;
import com.microsoft.graph.authentication.TokenCredentialAuthProvider;
import com.microsoft.graph.requests.GraphServiceClient;
import com.microsoft.graph.models.User;

import java.util.Arrays;
import java.util.List;

public class GraphExample {
    public static void main(String[] args) {
        // Create an authentication provider
        final ClientSecretCredential credential = new ClientSecretCredentialBuilder()
            .tenantId("YOUR_TENANT_ID")
            .clientId("YOUR_CLIENT_ID")
            .clientSecret("YOUR_CLIENT_SECRET")
            .build();
            
        final List<String> scopes = Arrays.asList("https://graph.microsoft.com/.default");
        final TokenCredentialAuthProvider authProvider = new TokenCredentialAuthProvider(scopes, credential);

        // Initialize the Graph client
        final GraphServiceClient<Request> graphClient = GraphServiceClient
            .builder()
            .authenticationProvider(authProvider)
            .buildClient();

        // Make a request to get the user's profile
        try {
            User user = graphClient.me().buildRequest().get();
            System.out.println("User display name: " + user.displayName);
        } catch (Exception e) {
            System.out.println("Error getting user profile: " + e.getMessage());
        }
    }
}`,
      description: 'Using Microsoft Graph Java SDK with Azure Identity'
    },
    php: {
      language: 'php',
      code: `<?php
// PHP example for ${permission}
require_once __DIR__ . '/vendor/autoload.php';

use Microsoft\\Graph\\Graph;
use Microsoft\\Graph\\Model;

// Initialize the Graph client
$graph = new Graph();
$graph->setAccessToken('YOUR_ACCESS_TOKEN');

// Make a request to get the user's profile
try {
    $user = $graph->createRequest("GET", "/me")
                  ->setReturnType(Model\\User::class)
                  ->execute();
    echo "Hello, I am " . $user->getDisplayName();
} catch (Exception $e) {
    echo "Error getting user profile: " . $e->getMessage();
}`,
      description: 'Using Microsoft Graph PHP SDK'
    },
    go: {
      language: 'go',
      code: `// Go example for ${permission}
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/Azure/azure-sdk-for-go/sdk/azidentity"
	"github.com/microsoftgraph/msgraph-sdk-go"
	graphmodels "github.com/microsoftgraph/msgraph-sdk-go/models"
)

func main() {
	// Create an authentication provider
	cred, err := azidentity.NewClientSecretCredential(
		"YOUR_TENANT_ID",
		"YOUR_CLIENT_ID",
		"YOUR_CLIENT_SECRET",
		nil,
	)
	if err != nil {
		log.Fatalf("Error creating credential: %v\\n", err)
	}

	// Initialize the Graph client
	client, err := msgraph.NewGraphServiceClientWithCredentials(cred, []string{"https://graph.microsoft.com/.default"})
	if err != nil {
		log.Fatalf("Error creating client: %v\\n", err)
	}

	// Make a request to get the user's profile
	user, err := client.Me().Get(context.Background(), nil)
	if err != nil {
		log.Fatalf("Error getting user: %v\\n", err)
	}

	fmt.Printf("Hello, I am %s\\n", *user.GetDisplayName())
}`,
      description: 'Using Microsoft Graph Go SDK with Azure Identity'
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowFrameworkDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyCode = async () => {
    const selectedSnippet = codeSnippets[selectedFramework];
    if (selectedSnippet?.code) {
      try {
        await navigator.clipboard.writeText(selectedSnippet.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            Code Example for {permission}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-900">
              {frameworks.find(f => f.id === selectedFramework)?.name} Example
            </div>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowFrameworkDropdown(!showFrameworkDropdown)}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                {frameworks.find(f => f.id === selectedFramework)?.name}
                {showFrameworkDropdown ? (
                  <ChevronUp className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-2 h-4 w-4" />
                )}
              </button>

              {showFrameworkDropdown && (
                <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    {frameworks.map(framework => (
                      <button
                        key={framework.id}
                        onClick={() => {
                          setSelectedFramework(framework.id);
                          setShowFrameworkDropdown(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          selectedFramework === framework.id
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {framework.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-gray-800 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-200">
                {frameworks.find(f => f.id === selectedFramework)?.name} Example
              </span>
              <button
                onClick={handleCopyCode}
                className="text-gray-400 hover:text-gray-300"
              >
                {copied ? (
                  <span className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm">Copied!</span>
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Copy className="h-4 w-4 mr-1" />
                    <span className="text-sm">Copy</span>
                  </span>
                )}
              </button>
            </div>
            <div className="p-4 overflow-x-auto max-h-64">
              <pre className="text-sm">
                <code className="text-gray-300 whitespace-pre-wrap">
                  {codeSnippets[selectedFramework]?.code || 'Code example not available for this framework.'}
                </code>
              </pre>
            </div>
          </div>

          {codeSnippets[selectedFramework]?.description && (
            <p className="mt-3 text-sm text-gray-600">
              {codeSnippets[selectedFramework].description}
            </p>
          )}
        </div>

        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}