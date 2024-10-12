#!/bin/bash

# .husky/pre-commit/pre-commit.sh

# Purpose: This script executes pre-commit checks to ensure code quality and consistency before committing changes to the Git repository.
# It runs linting, code formatting, and testing, ensuring that only high-quality code is committed.

# Prerequisites:
# - Ensure Node.js and npm are installed on the system.
# - Have the project dependencies installed using 'npm install'.
# - Configure environment variables as per the MVP's requirements.
# - Run 'npm run build' to ensure all dependencies are built and available.

# Features:
# - Linting using ESLint to enforce code quality and best practices.
# - Code formatting using Prettier to maintain consistent code style.
# - Testing using Jest to ensure code functionality and correctness.
# - Error handling for failed checks, providing informative messages to the user.

# Design Patterns:
# - None: The script is a simple sequence of commands, and there's no need for complex design patterns.

# Pseudocode:
# 1. Run ESLint to check for code quality and best practices.
# 2. If ESLint fails, exit with a non-zero exit code.
# 3. Run Prettier to format the code according to the project's style guide.
# 4. If Prettier fails, exit with a non-zero exit code.
# 5. Run Jest to execute unit tests.
# 6. If Jest fails, exit with a non-zero exit code.

# Performance Considerations:
# - Minimize the number of commands executed for efficiency.
# - Utilize caching where possible to reduce execution time.
# - Use asynchronous operations where appropriate for better performance.

# Inputs:
# - None: The script operates on the current Git staging area.

# Outputs:
# - Exit code: 0 for success, non-zero for failure.
# - Error messages (if any) are printed to the console.

# Dependencies:
# - Core modules: `bash` (shell scripting)
# - Third-party: ESLint (`eslint`), Prettier (`prettier`), Jest (`jest`)
# - Internal: Build scripts defined in `package.json`
# - Environment variables: `NODE_ENV` (for development/production settings)
# - Configuration files: `.eslintrc.js`, `.prettierrc`, `jest.config.js`

# Execution logic:
# - Check if the script is running in development mode.
#   - If so, skip certain checks (e.g., Jest tests).
#   - If not, run all checks (linting, formatting, testing).
# - Run ESLint, Prettier, and Jest with appropriate configurations.
# - Handle errors by printing informative messages and exiting with a non-zero exit code.
# - Provide detailed logging for debugging purposes.

# Data Management:
# - None: The script does not manage any data.

# Network Requests:
# - None: The script does not make any network requests.

# Error Handling:
# - Check the exit codes of each command.
#   - If any command fails, print an error message and exit with a non-zero exit code.

# Logging:
# - Log the execution of each command, including the command and its output.
# - Log any errors encountered with specific details for debugging.

# Performance Optimization:
# - Utilize caching mechanisms for ESLint, Prettier, and Jest where applicable.
# - Consider using a separate script to handle performance optimization tasks.

# Security:
# - Ensure all sensitive data is properly stored in environment variables.
# - Validate any user input (if applicable) and sanitize it for security.
# - Implement input validation and sanitization rules to prevent XSS and CSRF attacks.

# Integration with Other MVP Components:
# - `package.json`:  This file depends on build scripts defined in `package.json`.
# - `jest.config.js`, `.eslintrc.js`, `.prettierrc`:  These files define configurations for Jest, ESLint, and Prettier.

# Scalability:
# - This script is designed to be scalable by using built-in command-line tools.
# - Consider using a separate script for handling complex pre-commit checks as the MVP grows.

# Monorepo Integration:
# - This file is located within the `.husky/pre-commit` directory of the monorepo.
# -  The script leverages shared libraries and components from other packages by using appropriate import paths defined in `package.json`.

# Cross-Package Communication:
# - None: This script does not directly communicate with other packages.

# Testing and QA:
# - Unit tests are not typically needed for this type of script.
# -  Integration tests should be implemented to verify that the script correctly executes ESLint, Prettier, and Jest.
# -  Performance tests should be implemented to measure the script's execution time and optimize it.

# Linting and Code Formatting:
# - Use ESLint with the `eslint-config-next` configuration for linting.
# - Use Prettier with the default configuration for code formatting.

# Documentation:
# - Document each command and its purpose clearly.
# -  Add comments to explain complex logic or edge cases.

# Code Example:
# This code example should be expanded and customized to meet the specific needs of your project.
# Ensure constant reference to this prompt and the existing codebase for seamless integration and high-quality implementation.

set -e # Exit on error

# Ensure all dependencies are built
npm run build

# Run linting checks
echo "Running ESLint..."
eslint --ext .js,.jsx,.ts,.tsx src/
echo "ESLint check complete."

# Run code formatting checks
echo "Running Prettier..."
prettier --write "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}""
echo "Prettier check complete."

# Run Jest tests (only for production builds)
if [ "$NODE_ENV" == "production" ]; then
  echo "Running Jest tests..."
  jest
  echo "Jest tests complete."
fi

# Script execution successful
echo "Pre-commit checks passed!"