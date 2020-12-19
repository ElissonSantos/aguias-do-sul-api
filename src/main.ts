import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import 'firebase/auth';
import 'firebase/firestore';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  var firebaseConfig = {
    apiKey: configService.get<string>('FIREBASE_API_KEY'),
    authDomain: configService.get<string>('FIREBASE_AUTH_DOMAIN'),
    databaseURL: configService.get<string>('FIREBASE_DB_URL'),
    projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
    storageBucket: configService.get<string>('FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: configService.get<string>('FIREBASE_MESSAGING_ID'),
    appId: configService.get<string>('FIREBASE_APP_ID'),
    measurementId: configService.get<string>('FIREBASE_MEASUREMENT_ID')
  };

  admin.initializeApp(firebaseConfig);

  app.enableCors();

  await app.listen(configService.get<string>('API_PORT') || 4000);
}
bootstrap();
