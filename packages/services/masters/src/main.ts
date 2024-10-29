import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  try {
    // Load environment variables
    dotenv.config();

    // Create the Nest application with CORS enabled
    const app = await NestFactory.create(AppModule, { cors: true }); // Enable CORS here

    // Remove the global prefix for all routes
    // const globalPrefix = 'api'; // Commented out as we are removing the prefix
    // app.setGlobalPrefix(globalPrefix); // This line is removed

    // Configure Swagger for API documentation
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Connect')
      .setDescription('API description for the NestJS application')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document);

    // Set the port from environment variable or default to 3000
    const port = process.env.PORT || 3000;

    // Start the application
    await app.listen(port);

    // Log application running information
    Logger.log(`🚀 Application is running on: http://localhost:${port}`); // Updated to remove global prefix
    Logger.log(`📚 Swagger documentation is available at: http://localhost:${port}/api/docs`);
  } catch (error) {
    Logger.error('Failed to start the application', error);
  }
}

// Bootstrap the application
bootstrap();
