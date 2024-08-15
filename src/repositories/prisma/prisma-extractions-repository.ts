import { Prisma, Extraction } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma/prisma.service';
import { ExtractionRepository } from '../extractions-repository';

@Injectable()
export class PrismaExtractionsRepository implements ExtractionRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Extraction | null> {
    return this.prisma.extraction.findUnique({
      where: {
        id,
      },
    });
  }

  async findByUserId(user_id: string): Promise<Extraction[] | null> {
    return this.prisma.extraction.findMany({
      where: {
        user_id,
      },
    });
  }

  async create(
    data: Prisma.ExtractionUncheckedCreateInput,
  ): Promise<Extraction> {
    return this.prisma.extraction.create({
      data,
    });
  }
}
