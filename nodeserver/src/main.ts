import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);

  const apiPrefix = config.get<string>('API_PREFIX', 'api');
  const port = config.get<number>('PORT', 3000);
  const corsOrigin = config.get<string>('CORS_ORIGIN', 'http://localhost:5174');

  app.setGlobalPrefix(apiPrefix);
  app.enableCors({
    origin: corsOrigin.split(',').map((s) => s.trim()),
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Serve built React app at /
  app.useStaticAssets(path.join(process.cwd(), 'Client', 'dist'));
  // Serve LMS HTML pages at /lms/
  app.useStaticAssets(path.join(process.cwd(), 'Client', 'lms'), { prefix: '/lms' });
  // Serve admin-uploaded files at /uploads/
  app.useStaticAssets(path.join(process.cwd(), 'uploads'), { prefix: '/uploads' });

  await app.listen(port);
  Logger.log(
    `🚀 Server running at http://localhost:${port}/${apiPrefix}`,
    'Bootstrap',
  );
}
bootstrap();
