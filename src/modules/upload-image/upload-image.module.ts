import { Module } from '@nestjs/common';
import { UploadImageService } from '../../services/upload-image/upload-image.service';
import { GetOneExtractionController } from '../../controllers/get-one-extraction/get-one-extraction.controller';
import { OCRService } from 'src/services/ocr/ocr.service';
import { CreateExtractionService } from 'src/services/create-extraction/create-extraction.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository';
import { PrismaExtractionsRepository } from 'src/repositories/prisma/prisma-extractions-repository';

@Module({
  imports: [],
  controllers: [GetOneExtractionController],
  providers: [
    UploadImageService,
    OCRService,
    CreateExtractionService,
    PrismaService,
    PrismaUsersRepository,
    PrismaExtractionsRepository,
  ],
})
export class UploadImageModule {}
