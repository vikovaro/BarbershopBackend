import { NestFactory } from '@nestjs/core';
import { SalonModule } from './salon/salon.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(SalonModule);

    const config = new DocumentBuilder()
        .setTitle('PC Assembler API')
        .setDescription('API for Manik Salon:)')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const methods = ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE', 'PATCH'];
    const urls = ['http://localhost:3001', 'http://localhost:3002', 'http://localhost:8080'];
    app.enableCors({
        origin: urls,
        methods: methods,
        credentials: true,
    });

    await app.listen(3003);
    console.log(`Salon backend-app start at port 3003`);
}

bootstrap();
