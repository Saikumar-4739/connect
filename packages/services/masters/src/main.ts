/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // Import Swagger

async function bootstrap() {
  try {
    // Create the Nest application
    const app = await NestFactory.create(AppModule);

    // Set the global prefix for all routes
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);

    // Enable CORS for cross-origin requests
    app.enableCors();

    // Configure Swagger for API documentation
    const swaggerConfig = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('API description for the NestJS application')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document);

    // Set the port from environment variable or default to 3000
    const port = process.env.PORT || 3000;

    // Start the application
    await app.listen(port);
    Logger.log(
      `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
    );
  } catch (error) {
    Logger.error('Failed to start the application', error);
  }
}

// Bootstrap the application
bootstrap();
