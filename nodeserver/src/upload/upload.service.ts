import { Injectable, NotFoundException } from '@nestjs/common';
import { unlink } from 'fs/promises';
import { join } from 'path';

const FOLDER_MAP: Record<string, string> = {
  video: 'videos',
  audio: 'audio',
  document: 'documents',
};

@Injectable()
export class UploadService {
  register(file: Express.Multer.File, type: string) {
    const folder = FOLDER_MAP[type] || type;
    return {
      url: `/uploads/lms/${folder}/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    };
  }

  async delete(type: string, filename: string) {
    const folder = FOLDER_MAP[type] || type;
    const filePath = join(process.cwd(), 'uploads', 'lms', folder, filename);
    try {
      await unlink(filePath);
    } catch {
      throw new NotFoundException(`File not found: ${filename}`);
    }
  }
}
