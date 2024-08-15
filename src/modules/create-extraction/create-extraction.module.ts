import { Module } from '@nestjs/common';
import { CreateExtractionService } from '../../services/create-extraction/create-extraction.service';
import { EnvService } from 'src/env/env.service';

@Module({
  imports: [],
  providers: [CreateExtractionService, EnvService],
})
export class CreateExtractionModule {}
