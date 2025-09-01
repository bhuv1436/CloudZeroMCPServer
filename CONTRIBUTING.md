# Contributing to CloudZero MCP Server

Thank you for your interest in contributing to the CloudZero MCP Server! This document provides guidelines for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Style Guidelines](#style-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Set up the development environment
4. Create a new branch for your feature or fix

## Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Add your CloudZero API key to .env
   ```

3. **Install CloudZero SDK:**
   ```bash
   npx api install "@cloudzero/v2.0.0-main#1dpb61pmea4h1ld"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## Making Changes

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes following our coding standards**

3. **Add tests for new functionality**

4. **Update documentation as needed**

5. **Ensure all tests pass:**
   ```bash
   npm test
   ```

6. **Lint your code:**
   ```bash
   npm run lint
   npm run lint:fix  # Auto-fix issues
   ```

## Testing

- Write unit tests for new functionality
- Ensure all existing tests continue to pass
- Test with a real CloudZero API key (use a test account if possible)
- Add integration tests for new MCP tools

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Submitting Changes

1. **Push your changes to your fork**
2. **Create a pull request with:**
   - Clear description of changes
   - Reference to any related issues
   - Screenshots/examples if applicable
   - Updated documentation

3. **Ensure your PR:**
   - Passes all CI checks
   - Has been reviewed by maintainers
   - Follows our coding standards

## Style Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code style (we use ESLint and Prettier)
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused

### Git Commit Messages

Use conventional commits format:

```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
- `feat(tools): add pagination support to billing costs`
- `fix(client): handle network timeout errors gracefully`
- `docs(readme): update installation instructions`

### TypeScript Guidelines

- Use strict TypeScript settings
- Define interfaces for all data structures
- Avoid `any` types (use `unknown` if necessary)
- Use proper error handling with typed exceptions

### Testing Guidelines

- Test files should be named `*.test.ts`
- Use descriptive test names
- Test both success and error cases
- Mock external dependencies

## Documentation

- Update README.md for user-facing changes
- Update API documentation for new tools
- Add inline code comments for complex logic
- Update CHANGELOG.md for release notes

## Security

- Never commit API keys or secrets
- Use environment variables for configuration
- Report security issues privately to maintainers
- Follow security best practices for API clients

## Questions?

Feel free to open an issue for questions or join our community discussions.

Thank you for contributing! 🎉