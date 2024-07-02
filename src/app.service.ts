import { Injectable } from '@nestjs/common';
import { File } from '@nest-lab/fastify-multer';
import { Upload } from '@aws-sdk/lib-storage';
import { S3, ObjectCannedACL } from '@aws-sdk/client-s3';

@Injectable()
export class AppService {
  private readonly s3: S3;

  constructor() {
    this.s3 = new S3({
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },

      endpoint: process.env.R2_ENDPOINT,
    });
  }

  async uploadFile(file: File, bucketName: string | null = null) {
    // set the s3 params
    const params = {
      Bucket: bucketName ?? process.env.R2_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
      ACL: ObjectCannedACL.public_read,
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
    };

    try {
      const response = await new Upload({
        client: this.s3,
        params,
      }).done();
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  getFilePublicUrl(key: string): string {
    return `${process.env.R2_URL}/${key}`;
  }
}
