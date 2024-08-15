import { Module } from '@nestjs/common';
import { GetAllExtractionsController } from '../../controllers/get-all-extractions/get-all-extractions.controller';
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository';
import { PrismaExtractionsRepository } from 'src/repositories/prisma/prisma-extractions-repository';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [GetAllExtractionsController],
  providers: [
    PrismaService,
    PrismaUsersRepository,
    PrismaExtractionsRepository,
  ],
})
export class GetAllExtractionsModule {}
