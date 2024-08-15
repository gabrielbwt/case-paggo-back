import { Controller, Get, Param } from '@nestjs/common';
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository';
import { PrismaExtractionsRepository } from 'src/repositories/prisma/prisma-extractions-repository';

@Controller('extractions')
export class GetAllExtractionsController {
  constructor(
    private readonly usersService: PrismaUsersRepository,
    private readonly extractionService: PrismaExtractionsRepository,
  ) {}

  @Get(':name')
  async getUserById(@Param('name') name: string) {
    const user = await this.usersService.findByName(name);
    const userExtractions = await this.extractionService.findByUserId(user.id);
    return {
      message: `Extrações para o usuário ID ${name}`,
      data: userExtractions,
    };
  }
}
