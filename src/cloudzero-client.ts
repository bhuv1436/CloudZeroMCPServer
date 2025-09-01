import { config } from 'dotenv';
import { logger } from './logger.js';

// Load environment variables
config();

export interface BillingCostsParams {
  start_date: string;
  end_date: string;
  granularity?: 'daily' | 'weekly' | 'monthly' | 'hourly' | 'yearly';
  group_by?: string[]; // Array of dimension names to group by
  cost_type?: 'real_cost' | 'amortized_cost' | 'billed_cost' | 'discounted_cost' | 'discounted_amortized_cost' | 'on_demand_cost' | 'invoiced_amortized_cost' | 'usage_amount';
  filters?: Record<string, string[]>; // JSON filters for advanced querying
  cursor?: string; // Pagination support
}

export interface BillingDimensionsParams {
  // Optional parameters for dimensions API if needed
}

export interface CloudZeroResponse {
  data: any;
  status: number;
  statusText: string;
}

export class CloudZeroClient {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.CLOUDZERO_API_KEY || '';
    
    if (!this.apiKey) {
      throw new Error(
        'CloudZero API key is required. Please set CLOUDZERO_API_KEY in your .env file.'
      );
    }
  }

  async getBillingCosts(params: BillingCostsParams): Promise<CloudZeroResponse> {
    const maxRetries = 3;
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        logger.debug('Attempting CloudZero API call for billing costs', { attempt, maxRetries, params: { start_date: params.start_date, end_date: params.end_date, granularity: params.granularity } });
        // Import the CloudZero SDK dynamically to avoid module resolution issues during development
        const { default: cloudzero } = await import('@api/cloudzero');
        
        // Configure authentication
        cloudzero.auth(this.apiKey);

        // Prepare parameters with URL encoding for dates
        const requestParams: any = {
          start_date: encodeURIComponent(params.start_date),
          end_date: encodeURIComponent(params.end_date),
          granularity: params.granularity || 'daily',
          cost_type: params.cost_type || 'real_cost',
        };

        // Handle group_by dimensions (always an array now)
        if (params.group_by && params.group_by.length > 0) {
          requestParams.group_by = params.group_by;
        } else {
          requestParams.group_by = ['Service']; // Default grouping
        }

        // Add filters if provided
        if (params.filters) {
          requestParams.filters = JSON.stringify(params.filters);
        }

        // Add pagination cursor if provided
        if (params.cursor) {
          requestParams.cursor = params.cursor;
        }

        // Make the API call
        const response = await cloudzero.getBillingCosts(requestParams);
        logger.debug('CloudZero API call succeeded for billing costs', { attempt, responseStatus: response.status });
        
        return {
          data: response.data,
          status: response.status || 200,
          statusText: 'OK',
        };
        
      } catch (error: any) {
        lastError = error;
        const isRetryable = this.isRetryableError(error);
        
        if (!isRetryable || attempt === maxRetries) {
          // Don't retry non-retryable errors or if this was the last attempt
          break;
        }
        
        // Wait before retrying with exponential backoff
        const delayMs = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
    
    // All retries failed
    throw new Error(`CloudZero API error after ${maxRetries} attempts: ${lastError?.message || lastError}`);
  }

  async getBillingDimensions(_params?: BillingDimensionsParams): Promise<CloudZeroResponse> {
    const maxRetries = 3;
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        logger.debug('Attempting CloudZero API call for billing dimensions', { attempt, maxRetries });
        // Import the CloudZero SDK dynamically to avoid module resolution issues during development
        const { default: cloudzero } = await import('@api/cloudzero');
        
        // Configure authentication
        cloudzero.auth(this.apiKey);

        // Prepare parameters following the same pattern as getBillingCosts
        const requestParams: any = {};

        // Add optional include_hidden parameter if provided in the future
        // Currently BillingDimensionsParams is empty but following the same pattern

        // Make the API call for dimensions
        const response = await cloudzero.getBillingDimensions(requestParams);
        logger.debug('CloudZero API call succeeded for billing dimensions', { attempt, responseStatus: response.status });
        
        return {
          data: response.data,
          status: response.status || 200,
          statusText: 'OK',
        };
        
      } catch (error: any) {
        lastError = error;
        const isRetryable = this.isRetryableError(error);
        
        if (!isRetryable || attempt === maxRetries) {
          // Don't retry non-retryable errors or if this was the last attempt
          break;
        }
        
        // Wait before retrying with exponential backoff
        const delayMs = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
    
    // All retries failed
    throw new Error(`CloudZero API error after ${maxRetries} attempts: ${lastError?.message || lastError}`);
  }

  // Validate API key is configured
  isConfigured(): boolean {
    return !!this.apiKey;
  }

  // Helper method to determine if an error is retryable
  private isRetryableError(error: any): boolean {
    // Network or timeout errors are typically retryable
    if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT' || error.code === 'ENOTFOUND') {
      return true;
    }
    
    // HTTP 5xx errors are typically retryable
    if (error.status >= 500 && error.status < 600) {
      return true;
    }
    
    // HTTP 429 (rate limit) is retryable
    if (error.status === 429) {
      return true;
    }
    
    // Don't retry 4xx errors (client errors) except 429
    if (error.status >= 400 && error.status < 500) {
      return false;
    }
    
    // Default to retrying for unknown errors
    return true;
  }
}