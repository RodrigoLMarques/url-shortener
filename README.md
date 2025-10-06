# URL Shortener API

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

<p align="center">
  A URL shortening service built with NestJS, featuring caching, rate limiting, and API documentation.
</p>

<p align="center">
  <a href="https://nestjs.com/" target="_blank"><img src="https://img.shields.io/badge/Built%20with-NestJS-red.svg" alt="Built with NestJS" /></a>
  <a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://swagger.io/" target="_blank"><img src="https://img.shields.io/badge/Swagger-85EA2D?logo=swagger&logoColor=black" alt="Swagger" /></a>
  <a href="https://www.postgresql.org/" target="_blank"><img src="https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white" alt="PostgreSQL" /></a>
  <a href="https://redis.io/" target="_blank"><img src="https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white" alt="Redis" /></a>
</p>

## Table of Contents

- [Project](#project)
- [API Features](#api-features)
- [Swagger](#swagger)
- [Running the Project](#running-the-project)
- [Running Tests](#running-tests)

## Project

This is a production-ready URL shortening service that provides:

- **URL Shortening**: Convert long URLs into short, manageable aliases
- **Real-time Analytics**: Track click counts and usage statistics
- **Rate Limiting**: Protect against abuse and ensure fair usage
- **Caching**: Redis-based caching for improved performance
- **Documentation**: Interactive Swagger UI

**Live Demo**: https://link.marquesdev.com
> ⚠️ **Service Status**: Currently offline

## Swagger

Interactive API documentation is available at `/api`:

- **Development**: http://localhost:3000/api
- **Production**: https://link.marquesdev.com/api

### Features

- **Interactive Testing**: Test endpoints directly from the browser
- **Request/Response Examples**: Comprehensive examples for all endpoints
- **Schema Validation**: Automatic validation documentation
- **Error Responses**: Documented error codes and messages

## Running the Project

### Prerequisites

- Node.js 20+ 
- Docker & Docker Compose

### Environment Setup

1. **Clone the repository**
```bash
git clone https://github.com/RodrigoLMarques/url-shortener.git
cd url-shortener
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**
Copy the example environment file and configure your variables:
```bash
cp .env.example .env
```
Edit the `.env` file with your configuration

### Running with Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend
```

### Health Check

```bash
# Check if the API is running
curl http://localhost:3000/api

# Should return Swagger UI
```

## Running Tests

### Test Structure

- **Unit Tests**: Test individual components in isolation
- **E2E Tests**: Test complete user workflows

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run E2E tests
npm run test:e2e

# Debug tests
npm run test:debug
```
