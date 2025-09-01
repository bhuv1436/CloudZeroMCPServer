import { CloudZeroClient, BillingDimensionsParams } from '../cloudzero-client.js';
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export async function getBillingDimensionsTool(
  client: CloudZeroClient,
  _args: any
): Promise<CallToolResult> {
  try {
    // Check if client is configured
    if (!client.isConfigured()) {
      return {
        content: [
          {
            type: 'text',
            text: '❌ CloudZero API key not configured. Please set CLOUDZERO_API_KEY in your .env file.',
          },
        ],
      };
    }

    // Prepare parameters (dimensions API typically doesn't need parameters)
    const params: BillingDimensionsParams = {};

    // Make API call
    const response = await client.getBillingDimensions(params);

    // Format successful response
    const summary = formatBillingDimensionsResponse(response.data);
    
    return {
      content: [
        {
          type: 'text',
          text: `✅ CloudZero Billing Dimensions Retrieved\n\n${summary}`,
        },
      ],
    };

  } catch (error: any) {
    return {
      content: [
        {
          type: 'text',
          text: `❌ Error retrieving billing dimensions: ${error.message}\n\nPlease check:\n- Your API key is valid\n- CloudZero service is accessible`,
        },
      ],
    };
  }
}

function formatBillingDimensionsResponse(data: any): string {
  try {
    let summary = `📊 **Available Billing Dimensions**\n\n`;

    if (!data) {
      summary += '⚠️ No dimensions data returned from CloudZero API';
      return summary;
    }

    // Handle different response structures
    if (Array.isArray(data)) {
      summary += `📈 **Found ${data.length} available dimensions:**\n\n`;
      
      // Group dimensions by category if possible
      const categorizedDimensions: Record<string, string[]> = {};
      const uncategorizedDimensions: string[] = [];

      data.forEach((dimension: any) => {
        if (typeof dimension === 'string') {
          // Simple dimension name
          const category = getDimensionCategory(dimension);
          if (category) {
            if (!categorizedDimensions[category]) {
              categorizedDimensions[category] = [];
            }
            categorizedDimensions[category].push(dimension);
          } else {
            uncategorizedDimensions.push(dimension);
          }
        } else if (typeof dimension === 'object' && dimension.name) {
          // Dimension object with name property
          const category = getDimensionCategory(dimension.name);
          const displayName = dimension.display_name || dimension.name;
          if (category) {
            if (!categorizedDimensions[category]) {
              categorizedDimensions[category] = [];
            }
            categorizedDimensions[category].push(displayName);
          } else {
            uncategorizedDimensions.push(displayName);
          }
        }
      });

      // Display categorized dimensions
      Object.entries(categorizedDimensions).forEach(([category, dims]) => {
        summary += `**${category}:**\n`;
        dims.forEach(dim => summary += `  • ${dim}\n`);
        summary += '\n';
      });

      // Display uncategorized dimensions
      if (uncategorizedDimensions.length > 0) {
        summary += `**Other Dimensions:**\n`;
        uncategorizedDimensions.forEach(dim => summary += `  • ${dim}\n`);
      }

      summary += `\n**Usage Examples:**\n`;
      summary += `• Single grouping: \`group_by: "Service"\`\n`;
      summary += `• Multiple grouping: \`group_by: ["Service", "Account"]\`\n`;
      summary += `• With filters: \`filters: {"CloudProvider": ["AWS"]}\`\n`;

    } else if (typeof data === 'object') {
      summary += '**Dimensions Data:**\n```json\n';
      summary += JSON.stringify(data, null, 2);
      summary += '\n```';
    } else {
      summary += `**Response:** ${data}`;
    }

    return summary;

  } catch (error) {
    return `**Raw Response:**\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\``;
  }
}

function getDimensionCategory(dimensionName: string): string | null {
  const name = dimensionName.toLowerCase();
  
  if (name.includes('service') || name.includes('product')) {
    return 'Services & Products';
  } else if (name.includes('account') || name.includes('billing')) {
    return 'Accounts & Billing';
  } else if (name.includes('region') || name.includes('zone') || name.includes('location')) {
    return 'Regions & Locations';
  } else if (name.includes('cloud') || name.includes('provider') || name.includes('aws') || name.includes('azure') || name.includes('gcp')) {
    return 'Cloud Providers';
  } else if (name.includes('tag') || name.includes('label')) {
    return 'Tags & Labels';
  } else if (name.includes('user') || name.includes('custom')) {
    return 'Custom Dimensions';
  }
  
  return null;
}