import cloudinary from "../config/cloudinary.js";

const uploadProductImage = (fileBuffer: Buffer) => {
  return new Promise<{ imageUrl: string; publicId: string }>(
    (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "floe-combat/products",
          resource_type: "image",
          fetch_format: "auto",
          quality: "auto",
        },

        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          if (!result) {
            reject(new Error("Cloudinary did not return an upload result."));
            return;
          }

          resolve({
            imageUrl: result.secure_url,

            publicId: result.public_id,
          });
        },
      );

      uploadStream.end(fileBuffer);
    },
  );
};

const deleteProductImage = async (publicId: string) => {
  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",

    invalidate: true,
  });

  return result;
};

const uploadHighlightMedia = (
  fileBuffer: Buffer,
  mediaType: "image" | "video",
) => {
  return new Promise<{ mediaUrl: string; publicId: string }>(
    (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "floe-combat/highlights",
          resource_type: mediaType,
          fetch_format: "auto",
          quality: "auto",
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          if (!result) {
            reject(new Error("Cloudinary did not return an upload result."));
            return;
          }

          resolve({
            mediaUrl: result.secure_url,
            publicId: result.public_id,
          });
        },
      );

      uploadStream.end(fileBuffer);
    },
  );
};

const deleteHighlightMedia = async (
  publicId: string,
  mediaType: "image" | "video",
) => {
  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: mediaType,
    invalidate: true,
  });

  return result;
};

const uploadHighlightThumbnail = (fileBuffer: Buffer) => {
  return new Promise<{ thumbnailUrl: string; publicId: string }>(
    (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "floe-combat/highlights/thumbnails",
          resource_type: "image",
          fetch_format: "auto",
          quality: "auto",
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          if (!result) {
            reject(new Error("Cloudinary did not return an upload result."));
            return;
          }

          resolve({
            thumbnailUrl: result.secure_url,
            publicId: result.public_id,
          });
        },
      );

      uploadStream.end(fileBuffer);
    },
  );
};

const deleteHighlightThumbnail = async (publicId: string) => {
  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
    invalidate: true,
  });

  return result;
};

export {
  uploadProductImage,
  deleteProductImage,
  uploadHighlightMedia,
  deleteHighlightMedia,
  uploadHighlightThumbnail,
  deleteHighlightThumbnail,
};
