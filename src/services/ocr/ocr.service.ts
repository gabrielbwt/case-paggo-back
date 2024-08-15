import { Injectable } from '@nestjs/common';
import { createWorker } from 'tesseract.js';

@Injectable()
export class OCRService {
  async recognizeImage(imageUrl: string) {
    const worker = await createWorker('por');
    const ret = await worker.recognize(imageUrl);
    await worker.terminate();
    return ret.data.text;
  }
}
