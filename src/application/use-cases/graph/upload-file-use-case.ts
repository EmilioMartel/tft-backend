import { FileService } from "../../../infrastructure/services";

export interface UseCase<T, R> {
  execute(param: T): R;
}

export class UploadFileUseCase implements UseCase<Express.Multer.File, Promise<void>> {
  constructor(private fileService: FileService) {}

  async execute(file: Express.Multer.File): Promise<void> {
    await this.fileService.saveFile(file);
  }
}