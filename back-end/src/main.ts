import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  
  app.enableCors(); // NOTE: IP::PORT 허용되도록 수정.
}
bootstrap();
