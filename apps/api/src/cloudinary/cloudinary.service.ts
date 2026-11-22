import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { Readable } from "stream";

@Injectable()
export class CloudinaryService {
  uploadImage(file: Express.Multer.File, folder = "avatar"): Promise<UploadApiResponse> {
    if (!file) throw new BadRequestException("Please provide file");

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
          allowed_formats: ["jpg", "jpeg", "png", "webp"],
          transformation: [
            { width: 400, height: 400, crop: "fill", gravity: "face" },
          ],
        },
        (error, result) => {
          if (error || !result) {
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

  async deleteImage(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
  }
}