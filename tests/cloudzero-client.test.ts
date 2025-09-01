import { CloudZeroClient } from '../src/cloudzero-client.js';

describe('CloudZeroClient', () => {
  let client: CloudZeroClient;

  beforeEach(() => {
    process.env.CLOUDZERO_API_KEY = 'test-api-key';
    client = new CloudZeroClient();
  });

  afterEach(() => {
    delete process.env.CLOUDZERO_API_KEY;
  });

  describe('constructor', () => {
    it('should initialize with API key from environment', () => {
      expect(client.isConfigured()).toBe(true);
    });

    it('should throw error if API key is missing', () => {
      delete process.env.CLOUDZERO_API_KEY;
      expect(() => new CloudZeroClient()).toThrow('CloudZero API key is required');
    });
  });

  describe('isConfigured', () => {
    it('should return true when API key is set', () => {
      expect(client.isConfigured()).toBe(true);
    });

    it('should return false when API key is empty', () => {
      process.env.CLOUDZERO_API_KEY = '';
      const emptyClient = new CloudZeroClient();
      expect(emptyClient.isConfigured()).toBe(false);
    });
  });

  describe('isRetryableError', () => {
    it('should identify retryable network errors', () => {
      const networkError = { code: 'ECONNRESET' };
      // @ts-ignore - accessing private method for testing
      expect(client.isRetryableError(networkError)).toBe(true);
    });

    it('should identify retryable HTTP 5xx errors', () => {
      const serverError = { status: 500 };
      // @ts-ignore - accessing private method for testing
      expect(client.isRetryableError(serverError)).toBe(true);
    });

    it('should identify non-retryable HTTP 4xx errors', () => {
      const clientError = { status: 400 };
      // @ts-ignore - accessing private method for testing
      expect(client.isRetryableError(clientError)).toBe(false);
    });

    it('should identify retryable rate limit errors', () => {
      const rateLimitError = { status: 429 };
      // @ts-ignore - accessing private method for testing
      expect(client.isRetryableError(rateLimitError)).toBe(true);
    });
  });
});