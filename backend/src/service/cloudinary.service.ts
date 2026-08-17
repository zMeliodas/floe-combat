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

export { uploadProductImage, deleteProductImage };
