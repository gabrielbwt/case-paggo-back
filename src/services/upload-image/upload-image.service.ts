import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { EnvService } from '../../env/env.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadImageService {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(
    private readonly configService: ConfigService,
    private envService: EnvService,
  ) {
    this.s3Client = new S3Client({
      region: envService.get('AWS_REGION'),
      credentials: {
        accessKeyId: envService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: envService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });

    this.bucketName = envService.get('AWS_S3_BUCKET_NAME');
  }

  async uploadFile(file: any): Promise<string> {
    const fileName = `${uuidv4()}-${file.originalname.replace(/[^a-zA-Z0-9-_\.]/g, '')}`;
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3Client.send(command);

    return `https://${this.bucketName}.s3.amazonaws.com/${fileName}`;
  }
}
