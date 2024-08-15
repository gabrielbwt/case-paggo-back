import { Prisma, Extraction } from '@prisma/client';

export interface ExtractionRepository {
  findById(id: string): Promise<Extraction | null>;
  findByUserId(user_id: string): Promise<Extraction[] | null>;
  create(data: Prisma.ExtractionUncheckedCreateInput): Promise<Extraction>;
}
