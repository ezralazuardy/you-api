import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { File } from '@nest-lab/fastify-multer';
import { extname } from 'path';

export function fileValidator(): PipeTransform {
  return new ParseFilePipeDocument();
}

@Injectable()
export class ParseFilePipeDocument implements PipeTransform {
  // allowed file extensions
  private readonly allowedExtensions = ['.png', '.jpeg', '.jpg'];

  transform(value: File): File {
    // get the file extension
    const extension = extname(value.originalname);

    // check if the file extension is allowed
    if (!this.allowedExtensions.includes(extension)) {
      throw new BadRequestException(`File type ${extension} not supported`);
    }

    // check if the file size is greater than 5MB
    if (value.size > 5000000) {
      throw new BadRequestException('File size must be less than 5MB');
    }

    return value;
  }
}
