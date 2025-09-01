#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import dotenv from 'dotenv';
import { CloudZeroClient } from './cloudzero-client.js';
import { getBillingCostsTool } from './tools/billing-costs.js';
import { getBillingDimensionsTool } from './tools/billing-dimensions.js';
import { logger } from './logger.js';

// Load environment variables
dotenv.config();

const server = new Server(
  {
    name: process.env.MCP_SERVER_NAME || 'cloudzero-mcp-server',
    version: process.env.MCP_SERVER_VERSION || '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Initialize CloudZero client
const cloudZeroClient = new CloudZeroClient();
logger.info('CloudZero MCP server initialized', { 
  name: process.env.MCP_SERVER_NAME || 'cloudzero-mcp-server',
  version: process.env.MCP_SERVER_VERSION || '1.0.0'
});

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  logger.debug('Tools list requested');
  return {
    tools: [
      {
        name: 'get_billing_costs',
        description: 'Retrieve billing costs from CloudZero with advanced filtering and multi-dimensional grouping',
        inputSchema: {
          type: 'object',
          properties: {
            start_date: {
              type: 'string',
              description: 'Start date in ISO format (e.g., 2025-01-01T00:00:00Z)',
            },
            end_date: {
              type: 'string',
              description: 'End date in ISO format (e.g., 2025-01-31T23:59:59Z)',
            },
            granularity: {
              type: 'string',
              enum: ['daily', 'weekly', 'monthly', 'hourly', 'yearly'],
              description: 'Time granularity for cost aggregation',
              default: 'daily',
            },
            group_by: {
              type: 'array',
              items: { type: 'string' },
              description: 'Dimension(s) to group costs by (e.g., ["Service"] or ["Service", "Account"])',
              default: ['Service'],
            },
            cost_type: {
              type: 'string',
              enum: ['real_cost', 'amortized_cost', 'billed_cost', 'discounted_cost', 'discounted_amortized_cost', 'on_demand_cost', 'invoiced_amortized_cost', 'usage_amount'],
              description: 'Type of cost calculation to use',
              default: 'real_cost',
            },
            filters: {
              type: 'object',
              description: 'JSON filters for advanced querying (e.g., {"CloudProvider": ["AWS"], "Service": ["EC2"]})',
              additionalProperties: {
                type: 'array',
                items: { type: 'string' }
              }
            },
            cursor: {
              type: 'string',
              description: 'Pagination cursor for fetching next set of results',
            },
          },
          required: ['start_date', 'end_date'],
        },
      },
      {
        name: 'get_billing_dimensions',
        description: 'Get available dimensions for billing cost queries and filtering',
        inputSchema: {
          type: 'object',
          properties: {},
          additionalProperties: false,
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  logger.debug('Tool call received', { tool: name, args });

  try {
    switch (name) {
      case 'get_billing_costs':
        return await getBillingCostsTool(cloudZeroClient, args);
      
      case 'get_billing_dimensions':
        return await getBillingDimensionsTool(cloudZeroClient, args);
      
      default:
        logger.error('Unknown tool requested', { tool: name });
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    logger.error('Tool execution failed', { tool: name, error: error instanceof Error ? error.message : error });
    throw error;
  }
});

// Start the server
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    logger.info('CloudZero MCP server started successfully', { transport: 'stdio' });
    console.error('CloudZero MCP server running on stdio');
  } catch (error) {
    logger.error('Failed to start MCP server', { error: error instanceof Error ? error.message : error });
    throw error;
  }
}

main().catch((error) => {
  logger.error('Unhandled server error', { error: error instanceof Error ? error.message : error });
  console.error('Server error:', error);
  process.exit(1);
});