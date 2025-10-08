# URL Shortener API

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

<p align="center">
  A URL shortening service built with NestJS, featuring caching, rate limiting, and API documentation.
</p>

<p align="center">
  <a href="https://github.com/RodrigoLMarques/url-shortener/actions/workflows/deploy.yml"><img src="https://github.com/RodrigoLMarques/url-shortener/actions/workflows/deploy.yml/badge.svg" alt="Deploy Status" /></a>
  <a href="https://nestjs.com/" target="_blank"><img src="https://img.shields.io/badge/Built%20with-NestJS-red.svg" alt="Built with NestJS" /></a>
  <a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://swagger.io/" target="_blank"><img src="https://img.shields.io/badge/Swagger-85EA2D?logo=swagger&logoColor=black" alt="Swagger" /></a>
  <a href="https://www.postgresql.org/" target="_blank"><img src="https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white" alt="PostgreSQL" /></a>
  <a href="https://redis.io/" target="_blank"><img src="https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white" alt="Redis" /></a>
  <a href="https://www.docker.com/" target="_blank"><img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white" alt="Docker" /></a>
</p>

## Table of Contents

- [Project](#project)
- [API Features](#api-features)
- [Tech Stack](#tech-stack)
- [Swagger](#swagger)
- [Database Documentation](#database-documentation)
- [Running the Project](#running-the-project)
  - [Prerequisites](#prerequisites)
  - [Environment Setup](#environment-setup)
  - [Running with Docker](#running-with-docker)
- [Deploy](#deploy)
  - [Self-Hosted Infrastructure](#self-hosted-infrastructure)
  - [CI/CD Pipeline](#cicd-pipeline)
- [Contributing](#contributing)
- [License](#license)

## Project

This is a production-ready URL shortening service that provides:

- **URL Shortening**: Convert long URLs into short, manageable aliases
- **Real-time Analytics**: Track click counts and usage statistics
- **Rate Limiting**: Protect against abuse and ensure fair usage
- **Caching**: Redis-based caching for improved performance
- **Documentation**: Interactive Swagger UI

**API Production**: https://link.marquesdev.com
**WEB Production**: https://link.marquesdev.com/web
**Frontend Repository**: [url-shortener-web](https://github.com/RodrigoLMarques/url-shortener-web)

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) - Progressive Node.js framework
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Database**: [PostgreSQL](https://www.postgresql.org/) - Relational database
- **ORM**: [MikroORM](https://mikro-orm.io/) - TypeScript ORM with Unit of Work and Identity Map
- **Cache**: [Redis](https://redis.io/) - In-memory data store for caching
- **API Docs**: [Swagger/OpenAPI](https://swagger.io/) - Interactive API documentation
- **Containerization**: [Docker](https://www.docker.com/) - Container platform

## Swagger

Interactive API documentation is available at `/docs`:

- **Development**: http://localhost:3000/docs
- **Production**: https://link.marquesdev.com/docs

## Database Documentation

The database schema is documented using DBML (Database Markup Language) for easy visualization.

1. **Access dbdiagram.io**: https://dbdiagram.io/
2. **Copy the schema**: Open `database-schema.dbml` file
3. **Paste and visualize**: Paste the content into the dbdiagram.io editor

## Running the Project

### Prerequisites

- Node.js 20+ 
- Docker & Docker Compose

### Environment Setup

1. **Clone the repository**
```bash
git clone https://github.com/RodrigoLMarques/url-shortener-api.git
cd url-shortener-api
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
curl http://localhost:3000/docs
# Should return Swagger UI
```

## Deploy

### Self-Hosted Infrastructure

The application is deployed on a **self-hosted infrastructure** with the following setup:

#### Hardware
- **Device**: Raspberry Pi 5
- **Architecture**: ARM64 (linux/arm64)

#### Network & Security
- **Reverse Proxy**: [Cloudflare Tunnel](https://www.cloudflare.com/products/tunnel/)
- **Domain**: Custom domain managed through Cloudflare

#### Container Orchestration
- **Docker Compose**: Multi-container application management
- **Services**:
  - Application (NestJS API)
  - PostgreSQL database
  - Redis cache
  - Cloudflare Tunnel connector

### CI/CD Pipeline

Automated deployment using **GitHub Actions** with self-hosted runners.

#### Pipeline Overview

```yaml
Trigger: Push to main branch
  ↓
Runner: Self-hosted (Raspberry Pi 5)
  ↓
Steps:
  1. Checkout code
  2. Login to GitHub Container Registry (GHCR)
  3. Build ARM64 Docker image
  4. Push image to GHCR
  5. Pull and restart containers on production
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
