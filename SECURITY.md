# Security Policy

## Supported Versions

We actively support security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability, please follow these steps:

### 1. **Do Not** Create a Public Issue
Please do not create a GitHub issue for security vulnerabilities as this could expose the vulnerability to potential attackers.

### 2. Report Privately
Send an email to the maintainers with the following information:
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Any suggested fixes (optional)

### 3. Response Timeline
- **Initial Response**: We will acknowledge your report within 48 hours
- **Assessment**: We will provide an initial assessment within 1 week
- **Fix**: We aim to release security fixes within 2-4 weeks depending on complexity
- **Disclosure**: We will coordinate with you on responsible disclosure

## Security Best Practices

### API Key Management
- **Never commit API keys** to version control
- Use environment variables for sensitive configuration
- Regularly rotate your CloudZero API keys
- Use separate API keys for different environments (dev/staging/prod)

### Environment Security
- Keep your `.env` file secure and never share it
- Use proper file permissions on configuration files
- Regularly update dependencies to patch known vulnerabilities

### Network Security
- Use HTTPS for all CloudZero API communications (enforced by default)
- Implement proper network firewalls in production deployments
- Consider rate limiting and monitoring for unusual API usage patterns

### Docker Security
- Our Docker image runs as a non-root user
- Keep the base Docker image updated
- Use Docker secrets for sensitive environment variables in production

## Known Security Considerations

### Input Validation
- All user inputs are validated before sending to CloudZero APIs
- Date formats are strictly validated using regex patterns
- Filter parameters are sanitized to prevent injection attacks

### API Rate Limiting
- The server implements retry logic with exponential backoff
- Consider implementing application-level rate limiting for high-traffic scenarios

### Dependency Security
- We regularly audit dependencies using `npm audit`
- Automated security scanning is enabled in our CI/CD pipeline
- Dependencies are kept up to date to address known vulnerabilities

## Security Updates

Security updates will be released as patch versions (e.g., 1.0.1, 1.0.2) and will include:
- Clear description of the security issue (after responsible disclosure period)
- Instructions for upgrading
- Any additional security measures users should take

## Contact

For security-related questions or concerns, please contact the maintainers.

Thank you for helping keep CloudZero MCP Server secure!