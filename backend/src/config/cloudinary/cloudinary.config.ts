import cloudinary from "cloudinary";
import { envs } from "../envs/env.config";
cloudinary.v2.config({
  cloud_name: envs.CLOUDINARY_NAME,
  api_key: envs.CLOUDINARY_KEY,
  api_secret: envs.CLOUDINARY_SECRET,
});

export { cloudinary };

//!configuracion para subir imagenes
// const uploadResult: CloudinaryResponse = await new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.v2.uploader.upload_stream(
//       {
//         upload_preset: 'tatrade_profile',
//         public_id: `${photo.originalname}`,
//         use_filename: true,
//         overwrite: true,
//         transformation: [
//           { width: 250, height: 250, gravity: 'faces', crop: 'thumb' },
//           { radius: 'max' },
//         ],
//       },
//       (error, result: UploadApiResponse | undefined) => {
//         if (error) return reject(error);
//         resolve(result as unknown as CloudinaryResponse);
//       },
//     );
//     uploadStream.end(photo.buffer);
//   });
