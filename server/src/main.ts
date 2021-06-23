import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
const requestIp = require('request-ip');

import { json } from 'express';

// tslint:disable: no-var-requires
const rateLimit = require('express-rate-limit');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  app.enableCors();
  app.setGlobalPrefix('/api');

  const options = new DocumentBuilder()
    .setTitle('Foundation API')
    .setDescription('Foundation API')
    .setVersion('1.0')
    .setBasePath('api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document);

  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000, // 15 minutes
  //     max: 1000, // limit each IP to 100 requests per windowMs
  //   }),
  // );

  app.use(requestIp.mw());
  app.use('*/bulk', json({ limit: '50mb' }));
  // app.use(json({ limit: '100kb' }));

  await app.listen(process.env.PORT || 9999);
}
bootstrap();
