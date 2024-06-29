import { Injectable } from '@nestjs/common';
import { File } from '@nest-lab/fastify-multer';
import * as AWS from 'aws-sdk';

@Injectable()
export class AppService {
  s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      endpoint: process.env.R2_ENDPOINT,
    });
  }

  async uploadFile(file: File, bucketName: string | null = null) {
    // set the s3 params
    const params = {
      Bucket: bucketName ?? process.env.R2_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
    };

    try {
      const response = await this.s3.upload(params).promise();
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  getPublicUrl(key: string): string {
    return `${process.env.R2_URL}/${key}`;
  }
}
