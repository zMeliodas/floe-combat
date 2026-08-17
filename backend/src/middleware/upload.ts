import multer from "multer";

const storage = multer.memoryStorage();

const imageFileFilter: multer.Options["fileFilter"] = (
  _req,
  file,
  callback,
) => {
  if (file.mimetype.startsWith("image/")) {
    callback(null, true);

    return;
  }

  callback(new Error("Only image files are allowed."));
};

const uploadImage = multer({
  storage,

  fileFilter: imageFileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export { uploadImage };
