import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { Readable } from "stream";
import { CLOUDINARY } from "./cloudinary.provider";

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject(CLOUDINARY) private readonly cloudinaryClient: typeof cloudinary,
  ) {}

  uploadImage(
    file: Express.Multer.File,
    folder = "avatar",
  ): Promise<UploadApiResponse> {
    if (!file) throw new BadRequestException("Please provide file");
    if (!file.buffer) throw new BadRequestException("File buffer is missing");

    return new Promise((resolve, reject) => {
      const stream = this.cloudinaryClient.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
          allowed_formats: ["jpg", "jpeg", "png", "webp"],
          transformation: [
            { width: 400, height: 400, crop: "fill", gravity: "face" },
          ],
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return reject(
              new InternalServerErrorException(
                error.message || "Image not uploaded!",
              ),
            );
          }
          if (!result) {
            return reject(
              new InternalServerErrorException("Image not uploaded!"),
            );
          }
          resolve(result);
        },
      );

      Readable.from(file.buffer).pipe(stream);
    });
  }

  async deleteImage(publicId: string): Promise<boolean> {
    try {
      const result = await this.cloudinaryClient.uploader.destroy(publicId, {
        resource_type: "image",
        invalidate: true,
      });

      return result.result === "ok";
    } catch {
      throw new InternalServerErrorException(
        "Cloudinary error while deleting image",
      );
    }
  }
}