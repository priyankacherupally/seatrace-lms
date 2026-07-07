import {
  Controller,
  Post,
  Delete,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join, extname } from 'path';
import { UploadService } from './upload.service';

const storageFor = (folder: string) =>
  diskStorage({
    destination: join(process.cwd(), 'uploads', 'lms', folder),
    filename: (_req, file, cb) => {
      const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
      cb(null, `${Date.now()}-${safe}`);
    },
  });

@Controller('lms/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('video')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storageFor('videos'),
      limits: { fileSize: 500 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith('video/')) cb(null, true);
        else cb(new BadRequestException('Only video files are allowed'), false);
      },
    }),
  )
  uploadVideo(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file provided');
    return this.uploadService.register(file, 'video');
  }

  @Post('audio')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storageFor('audio'),
      limits: { fileSize: 100 * 1024 * 1024 },
    }),
  )
  uploadAudio(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file provided');
    return this.uploadService.register(file, 'audio');
  }

  @Post('document')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storageFor('documents'),
      limits: { fileSize: 50 * 1024 * 1024 },
    }),
  )
  uploadDocument(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file provided');
    return this.uploadService.register(file, 'document');
  }

  @Delete(':type/:filename')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFile(
    @Param('type') type: string,
    @Param('filename') filename: string,
  ) {
    return this.uploadService.delete(type, filename);
  }
}
