import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('URL Shortener API')
  .setDescription(
    `
Public API for URL shortening with rate limiting.

Features:
- Create shortened URLs with unique aliases
- Search for existing URL information
- Automatic redirection to original URLs
- Real-time click counter
- Rate limiting for abuse protection
    `,
  )
  .setVersion('1.0.0')
  .setContact(
    'Developer',
    'https://github.com/RodrigoLMarques',
    'rodrigolopes.m2005@gmail.com',
  )
  .setLicense('MIT', 'https://opensource.org/licenses/MIT')
  .addTag('URL Shortener', 'Endpoints for URL management')
  .addServer('http://localhost:3000', 'Development server')
  .addServer('https://api.link.marquesdev.com', 'Production server')
  .build();
