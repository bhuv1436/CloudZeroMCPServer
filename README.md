# CloudZero MCP Server

[![CI](https://github.com/your-org/cloudzero-mcp-server/workflows/CI/badge.svg)](https://github.com/your-org/cloudzero-mcp-server/actions)
[![npm version](https://badge.fury.io/js/cloudzero-mcp-server.svg)](https://www.npmjs.com/package/cloudzero-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

A production-ready **Model Context Protocol (MCP) server** for integrating with CloudZero billing APIs. This server provides advanced cost analysis tools through a standardized MCP interface, enabling sophisticated cloud cost management and FinOps workflows.

## Features

- 🔍 **Billing Costs Retrieval**: Get detailed cost data with filtering options
- 🔒 **Secure Authentication**: Environment variable-based API key management
- ✅ **Input Validation**: Comprehensive validation with user-friendly error messages
- 📊 **Flexible Querying**: Support for different granularities, groupings, and cost types

## Prerequisites

- Node.js 18+ 
- CloudZero account with API access
- CloudZero API key

## Installation

1. **Clone or download this project**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install CloudZero SDK:**
   ```bash
   npx api install "@cloudzero/v2.0.0-main#1dpb61pmea4h1ld"
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file and add your CloudZero API key:
   ```env
   CLOUDZERO_API_KEY=your_actual_api_key_here
   ```

5. **Build the project:**
   ```bash
   npm run build
   ```

## Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## Available Tools

### `get_billing_costs`

Retrieve billing costs from CloudZero with filtering options.

**Parameters:**
- `start_date` (required): Start date in ISO format (e.g., `2025-01-01T00:00:00Z`)
- `end_date` (required): End date in ISO format (e.g., `2025-01-31T23:59:59Z`)
- `granularity` (optional): Time granularity - `daily`, `weekly`, or `monthly` (default: `daily`)
- `group_by` (optional): Dimension to group costs by (default: `Service`)
- `cost_type` (optional): Type of cost calculation - `real_cost`, `amortized_cost`, or `blended_cost` (default: `real_cost`)

**Example usage in MCP client:**
```json
{
  "tool": "get_billing_costs",
  "arguments": {
    "start_date": "2025-01-01T00:00:00Z",
    "end_date": "2025-01-31T23:59:59Z",
    "granularity": "daily",
    "group_by": "Service",
    "cost_type": "real_cost"
  }
}
```

## Error Handling

The server provides user-friendly error messages for common issues:

- Missing or invalid API key configuration
- Incorrect date formats
- Invalid parameter values
- CloudZero API connectivity issues

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `CLOUDZERO_API_KEY` | Yes | Your CloudZero API key |
| `MCP_SERVER_NAME` | No | Server name (default: "cloudzero-mcp-server") |
| `MCP_SERVER_VERSION` | No | Server version (default: "1.0.0") |

## Project Structure

```
├── src/
│   ├── index.ts                 # Main MCP server
│   ├── cloudzero-client.ts      # CloudZero API client
│   └── tools/
│       └── billing-costs.ts     # Billing costs tool implementation
├── .env.example                 # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

## Development

### Building
```bash
npm run build
```

### Running in development mode
```bash
npm run dev
```

## License

MIT