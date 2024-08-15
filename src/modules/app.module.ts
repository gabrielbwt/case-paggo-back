import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateExtractionModule } from './create-extraction/create-extraction.module';
import { UploadImageModule } from './upload-image/upload-image.module';
import { EnvModule } from '../env/env.module';
import { envSchema } from '../env/env';
import { GetAllExtractionsModule } from './get-all-extractions/get-all-extractions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    UploadImageModule,
    CreateExtractionModule,
    GetAllExtractionsModule,
  ],
})
export class AppModule {}
