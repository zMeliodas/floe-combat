import type { Request, Response } from "express";
import {
  uploadProductImage,
  deleteProductImage,
} from "../service/cloudinary.service.js";
import {
  createProduct,
  getAllProducts,
  deleteProductById,
  getProductById,
  updateProduct,
} from "../service/product.service.js";
import { parseSizes } from "../utils/helper.js";
import { createAdminActivity } from "../service/adminActivity.service.js";

const getProductsController = async (_req: Request, res: Response) => {
  try {
    const products = await getAllProducts();

    res.status(200).json({
      success: true,
      message: "Products fetched successfully.",
      result: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Could not fetch products.",
    });
  }
};

const createProductController = async (req: Request, res: Response) => {
  const { title, category, description, sizes } = req.body as Record<
    string,
    unknown
  >;

  if (
    typeof title !== "string" ||
    typeof category !== "string" ||
    typeof description !== "string" ||
    !title.trim() ||
    !category.trim() ||
    !description.trim()
  ) {
    res.status(400).json({
      success: false,
      message: "Title, category, and description are required.",
    });
    return;
  }

  if (!req.file) {
    res.status(400).json({
      success: false,
      message: "An image is required.",
    });
    return;
  }

  const parsedSizes = parseSizes(sizes);

  if (!parsedSizes) {
    res.status(400).json({
      success: false,
      message: 'Sizes must be a JSON array, such as ["S", "M", "L"].',
    });
    return;
  }

  try {
    const uploadedImage = await uploadProductImage(req.file.buffer);

    const product = await createProduct({
      title: title.trim(),
      category: category.trim(),
      description: description.trim(),
      imageUrl: uploadedImage.imageUrl,
      imagePublicId: uploadedImage.publicId,
      sizes: parsedSizes,
    });

    await createAdminActivity(req.admin!.adminId, "CREATE_PRODUCT", product.id);

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      result: product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Could not create product.",
    });
  }
};

const deleteProductController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({
      success: false,
      message: "Product ID must be a positive integer.",
    });
    return;
  }

  try {
    const deletedProduct = await deleteProductById(id);

    if (!deletedProduct) {
      res.status(404).json({
        success: false,
        message: "Product not found.",
      });
      return;
    }

    try {
      await deleteProductImage(deletedProduct.imagePublicId);
    } catch (cloudinaryError) {
      console.error(cloudinaryError);
      res.status(200).json({
        success: true,
        message: "Product deleted, but image cleanup failed.",
        result: deletedProduct,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Product and image deleted successfully.",
      result: deletedProduct,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Could not delete product.",
    });
  }
};

const updateProductController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const { title, category, description, sizes } = req.body as Record<
    string,
    unknown
  >;

  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({
      success: false,
      message: "Product ID must be a positive integer.",
    });
    return;
  }

  if (
    typeof title !== "string" ||
    typeof category !== "string" ||
    typeof description !== "string" ||
    !title.trim() ||
    !category.trim() ||
    !description.trim()
  ) {
    res.status(400).json({
      success: false,
      message: "Title, category, and description are required.",
    });
    return;
  }

  const parsedSizes = parseSizes(sizes);

  if (!parsedSizes) {
    res.status(400).json({
      success: false,
      message: 'Sizes must be a JSON array, such as ["S", "M", "L"].',
    });
    return;
  }

  try {
    const existingProduct = await getProductById(id);

    if (!existingProduct) {
      res.status(404).json({
        success: false,
        message: "Product not found.",
      });
      return;
    }

    let newImage: {
      imageUrl: string;
      publicId: string;
    } | null = null;

    if (req.file) {
      newImage = await uploadProductImage(req.file.buffer);
    }

    const updatedProduct = await updateProduct(
      id,
      newImage
        ? {
            title: title.trim(),
            category: category.trim(),
            description: description.trim(),
            sizes: parsedSizes,
            imageUrl: newImage.imageUrl,
            imagePublicId: newImage.publicId,
          }
        : {
            title: title.trim(),
            category: category.trim(),
            description: description.trim(),
            sizes: parsedSizes,
          },
    );

    if (!updatedProduct) {
      throw new Error("Product was not returned after update.");
    }

    if (newImage) {
      try {
        await deleteProductImage(existingProduct.imagePublicId);
      } catch (cloudinaryError) {
        console.error(cloudinaryError);

        res.status(200).json({
          success: true,
          message: "Product updated, but old image cleanup failed.",
          result: updatedProduct,
        });
        return;
      }
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      result: updatedProduct,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Could not update product.",
    });
  }
};

export {
  getProductsController,
  createProductController,
  deleteProductController,
  updateProductController,
};
