import { Request, Response } from "express";
import multer from "multer";
import path from "path";

const EXTENSION = [".png", ".jpg", ".jpeg", "webp"];
const MIME_TYPE = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

const storageFile: multer.StorageEngine = multer.diskStorage({
  destination: "public/",
  filename: (_req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const uploadThumbnail = multer({
  storage: storageFile,
  limits: {
    fileSize: 10000000, // 10MB
  },
  fileFilter(req, file, callback) {
    const extension: boolean =
      EXTENSION.indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
    const mimeType: boolean = MIME_TYPE.indexOf(file.mimetype) >= 0;

    if (extension && mimeType) {
      return callback(null, true);
    }

    callback(
      new Error(
        "Invalid file type. Only picture file on type PNG and JPG are allowed!"
      )
    );
  },
});

// const handleUploadThumbnail = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   return new Promise((resolve, reject): void => {
//     uploadThumbnail(req, res, (error) => {
//       console.log("MULTER ERROR", error);
//       if (error) {
//         reject(error);
//       }

//       console.log("MULTER FILE", req.file, req.files);

//       resolve({ file: req.file, body: req.body });
//     });
//   });
// };

// export { handleUploadThumbnail };