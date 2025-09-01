# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release of CloudZero MCP Server
- `get_billing_costs` tool with advanced filtering and grouping
- `get_billing_dimensions` tool for exploring available dimensions
- Support for multi-dimensional cost analysis
- Comprehensive input validation with user-friendly error messages
- Retry logic with exponential backoff for API calls
- Environment-based configuration
- Structured JSON logging
- Docker support with multi-stage builds
- GitHub Actions CI/CD pipeline
- Comprehensive test suite
- Security enhancements and input sanitization

### Security
- API key validation and sanitization
- Input parameter validation and sanitization
- Rate limiting protection
- Dependency vulnerability scanning

## [1.0.0] - 2025-01-XX

### Added
- Initial release
- MCP server implementation using official SDK
- CloudZero API integration
- Billing costs retrieval with filtering
- Multi-dimensional grouping support
- Pagination support for large datasets
- Comprehensive error handling
- TypeScript support with strict mode
- Development and production configurations

### Features
- **Billing Costs Tool**: Retrieve costs with advanced filtering options
  - Date range filtering with ISO 8601 format
  - Multiple granularity options (daily, weekly, monthly, hourly, yearly)
  - Multi-dimensional grouping (e.g., by Service, Account, Region)
  - JSON-based filtering for complex queries
  - Pagination support for large datasets
  - Multiple cost types (real_cost, amortized_cost, etc.)

- **Billing Dimensions Tool**: Explore available dimensions
  - Categorized dimension listing
  - Usage examples and guidance
  - Support for custom dimensions

- **Production Ready**: 
  - Comprehensive error handling and validation
  - Retry logic with exponential backoff
  - Structured logging
  - Security best practices
  - Docker support
  - CI/CD pipeline