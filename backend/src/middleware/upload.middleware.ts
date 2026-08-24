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

const videoFileFilter: multer.Options["fileFilter"] = (
  _req,
  file,
  callback,
) => {
  if (file.mimetype.startsWith("video/")) {
    callback(null, true);
    return;
  }

  callback(new Error("Only video files are allowed."));
};

const highlightFileFilter: multer.Options["fileFilter"] = (
  _req,
  file,
  callback,
) => {
  // Main highlight media can be an image or video
  if (file.fieldname === "media") {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      callback(null, true);
      return;
    }

    callback(new Error("Highlight media must be an image or video."));
    return;
  }

  // Thumbnail must only be an image
  if (file.fieldname === "thumbnail") {
    if (file.mimetype.startsWith("image/")) {
      callback(null, true);
      return;
    }

    callback(new Error("Thumbnail must be an image."));
    return;
  }

  callback(new Error("Unexpected upload field."));
};

const uploadImage = multer({
  storage,

  fileFilter: imageFileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const uploadVideo = multer({
  storage,
  fileFilter: videoFileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

const uploadHighlightFiles = multer({
  storage,
  fileFilter: highlightFileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

export { uploadImage, uploadVideo, uploadHighlightFiles };
