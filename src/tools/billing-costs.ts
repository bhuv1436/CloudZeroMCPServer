import { CloudZeroClient, BillingCostsParams } from '../cloudzero-client.js';

import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export async function getBillingCostsTool(
  client: CloudZeroClient,
  args: any
): Promise<CallToolResult> {
  try {
    // Validate required parameters
    const validationError = validateBillingCostsParams(args);
    if (validationError) {
      return {
        content: [
          {
            type: 'text',
            text: `❌ Invalid input: ${validationError}`,
          },
        ],
      };
    }

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

    // Prepare parameters with advanced features
    const params: BillingCostsParams = {
      start_date: args.start_date,
      end_date: args.end_date,
      granularity: args.granularity || 'daily',
      group_by: args.group_by || ['Service'],
      cost_type: args.cost_type || 'real_cost',
      filters: args.filters || undefined,
      cursor: args.cursor || undefined,
    };

    // Make API call
    const response = await client.getBillingCosts(params);

    // Format successful response
    const summary = formatBillingCostsResponse(response.data, params);
    
    return {
      content: [
        {
          type: 'text',
          text: `✅ CloudZero Billing Costs Retrieved\n\n${summary}`,
        },
      ],
    };

  } catch (error: any) {
    return {
      content: [
        {
          type: 'text',
          text: `❌ Error retrieving billing costs: ${error.message}\n\nPlease check:\n- Your API key is valid\n- Date formats are correct (ISO 8601: YYYY-MM-DDTHH:MM:SSZ)\n- CloudZero service is accessible`,
        },
      ],
    };
  }
}

function validateBillingCostsParams(args: any): string | null {
  if (!args) {
    return 'No parameters provided. Please provide at least start_date and end_date.';
  }

  if (!args.start_date) {
    return 'start_date is required. Format: YYYY-MM-DDTHH:MM:SSZ (e.g., 2025-01-01T00:00:00Z)';
  }

  if (!args.end_date) {
    return 'end_date is required. Format: YYYY-MM-DDTHH:MM:SSZ (e.g., 2025-01-31T23:59:59Z)';
  }

  // Validate date format (basic ISO 8601 check)
  const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
  
  if (!dateRegex.test(args.start_date)) {
    return 'start_date must be in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ (e.g., 2025-01-01T00:00:00Z)';
  }

  if (!dateRegex.test(args.end_date)) {
    return 'end_date must be in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ (e.g., 2025-01-31T23:59:59Z)';
  }

  // Validate date order
  const startDate = new Date(args.start_date);
  const endDate = new Date(args.end_date);

  if (startDate >= endDate) {
    return 'start_date must be before end_date';
  }

  // Validate optional parameters
  const validGranularities = ['daily', 'weekly', 'monthly', 'hourly', 'yearly'];
  if (args.granularity && !validGranularities.includes(args.granularity)) {
    return `granularity must be one of: ${validGranularities.join(', ')}`;
  }

  const validCostTypes = ['real_cost', 'amortized_cost', 'billed_cost', 'discounted_cost', 'discounted_amortized_cost', 'on_demand_cost', 'invoiced_amortized_cost', 'usage_amount'];
  if (args.cost_type && !validCostTypes.includes(args.cost_type)) {
    return `cost_type must be one of: ${validCostTypes.join(', ')}`;
  }

  // Validate group_by parameter (must be array)
  if (args.group_by) {
    if (!Array.isArray(args.group_by)) {
      return 'group_by must be an array of strings (e.g., ["Service"] or ["Service", "Account"])';
    }
    if (args.group_by.length === 0) {
      return 'group_by array cannot be empty';
    }
    // Check for empty or invalid dimension names
    for (const dim of args.group_by) {
      if (!dim || typeof dim !== 'string') {
        return 'group_by dimensions must be non-empty strings';
      }
    }
  }

  // Validate filters parameter (JSON object)
  if (args.filters) {
    if (typeof args.filters !== 'object' || Array.isArray(args.filters)) {
      return 'filters must be a JSON object (e.g., {"CloudProvider": ["AWS"]})';
    }
    // Validate filter structure
    for (const [key, value] of Object.entries(args.filters)) {
      if (!Array.isArray(value)) {
        return `filter "${key}" must have an array value (e.g., {"${key}": ["value1", "value2"]})`;
      }
    }
  }

  return null;
}

function formatBillingCostsResponse(data: any, params: BillingCostsParams): string {
  try {
    let summary = `📊 **Query Parameters:**\n`;
    summary += `• Period: ${params.start_date} to ${params.end_date}\n`;
    summary += `• Granularity: ${params.granularity}\n`;
    
    // Handle group_by (always an array now)
    summary += `• Grouped by: ${params.group_by?.join(', ') || 'Service'}\n`;
    
    summary += `• Cost type: ${params.cost_type}\n`;
    
    // Add filters information if present
    if (params.filters) {
      summary += `• Filters: ${JSON.stringify(params.filters)}\n`;
    }
    
    // Add pagination info if present
    if (params.cursor) {
      summary += `• Pagination: cursor provided\n`;
    }
    
    summary += '\n';

    if (!data) {
      summary += '⚠️ No data returned from CloudZero API';
      return summary;
    }

    // Handle different response structures
    if (Array.isArray(data)) {
      summary += `📈 **Results:** ${data.length} records found\n\n`;
      
      if (data.length > 0) {
        summary += '**Sample Data:**\n```json\n';
        summary += JSON.stringify(data.slice(0, 3), null, 2);
        if (data.length > 3) {
          summary += `\n... and ${data.length - 3} more records`;
        }
        summary += '\n```';
      }
    } else if (typeof data === 'object') {
      summary += '**Response Data:**\n```json\n';
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