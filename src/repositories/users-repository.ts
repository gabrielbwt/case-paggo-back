import { Prisma, User } from '@prisma/client';

export interface UsersRepository {
  findById(id: string): Promise<User | null>;
  findByName(name: string): Promise<User | null>;
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>;
}
