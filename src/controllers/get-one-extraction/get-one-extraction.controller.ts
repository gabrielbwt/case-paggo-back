import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageService } from '../../services/upload-image/upload-image.service';
import { OCRService } from 'src/services/ocr/ocr.service';
import { CreateExtractionService } from 'src/services/create-extraction/create-extraction.service';
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository';
import { PrismaExtractionsRepository } from 'src/repositories/prisma/prisma-extractions-repository';

@Controller('upload')
export class GetOneExtractionController {
  constructor(
    private readonly uploadImageService: UploadImageService,
    private readonly ocrService: OCRService,
    private readonly createExtractionService: CreateExtractionService,
    private readonly usersService: PrismaUsersRepository,
    private readonly extractionService: PrismaExtractionsRepository,
  ) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('name') name: string,
  ) {
    let user = await this.usersService.findByName(name);

    if (!user) {
      user = await this.usersService.create({ name });
    }

    const imageUrl = await this.uploadImageService.uploadFile(file);
    const text = await this.ocrService.recognizeImage(imageUrl);
    const response = await this.createExtractionService.generateText(text);

    await this.extractionService.create({
      user_id: user.id,
      image_url: imageUrl,
      title: response.title as string,
      content: response.content as string,
      additional_info: response.extra_informations as string,
    });

    return { imageUrl, response };
  }
}
