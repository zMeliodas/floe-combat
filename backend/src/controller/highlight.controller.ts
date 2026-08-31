import type { Request, Response } from "express";

import {
  getAllHighlights,
  getHighlightById,
  updateHighlight,
  deleteHighlightById,
} from "../service/highlight.service.js";

import {
  uploadHighlightMedia,
  deleteHighlightMedia,
  uploadHighlightThumbnail,
  deleteHighlightThumbnail,
} from "../service/cloudinary.service.js";

import { createHighlight } from "../service/highlight.service.js";

import { createAdminActivity } from "../service/adminActivity.service.js";

import { getHighlightVideoThumbnail } from "../utils/helper.js";

const getHighlightsController = async (_req: Request, res: Response) => {
  try {
    const highlights = await getAllHighlights();

    res.status(200).json({
      success: true,
      message: "Highlights fetched successfully.",
      result: highlights,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Could not fetch highlights.",
    });
  }
};

const getHighlightController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({
      success: false,
      message: "Highlight ID must be a positive integer.",
    });
    return;
  }

  try {
    const highlight = await getHighlightById(id);

    if (!highlight) {
      res.status(404).json({
        success: false,
        message: "Highlight not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Highlight fetched successfully.",
      result: highlight,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Could not fetch highlight.",
    });
  }
};

const createHighlightController = async (req: Request, res: Response) => {
  const { title, athlete } = (req.body ?? {}) as Record<string, unknown>;

  const files = (req.files ?? {}) as {
    media?: Express.Multer.File[];
    thumbnail?: Express.Multer.File[];
  };

  if (
    typeof title !== "string" ||
    typeof athlete !== "string" ||
    !title.trim() ||
    !athlete.trim()
  ) {
    res.status(400).json({
      success: false,
      message: "Title and athlete are required.",
    });
    return;
  }

  const mediaFile = files.media?.[0];
  const thumbnailFile = files.thumbnail?.[0];

  if (!mediaFile) {
    res.status(400).json({
      success: false,
      message: "An image or video is required.",
    });
    return;
  }

  const mediaType = mediaFile.mimetype.startsWith("video/") ? "video" : "image";

  let uploadedMedia: {
    mediaUrl: string;
    publicId: string;
  } | null = null;

  let uploadedThumbnail: {
    thumbnailUrl: string;
    publicId: string;
  } | null = null;

  try {
    uploadedMedia = await uploadHighlightMedia(mediaFile.buffer, mediaType);

    if (thumbnailFile) {
      uploadedThumbnail = await uploadHighlightThumbnail(thumbnailFile.buffer);
    }

    let thumbnailUrl: string | null = null;
    let thumbnailPublicId: string | null = null;

    if (uploadedThumbnail) {
      thumbnailUrl = uploadedThumbnail.thumbnailUrl;
      thumbnailPublicId = uploadedThumbnail.publicId;
    } else if (mediaType === "video") {
      thumbnailUrl = getHighlightVideoThumbnail(uploadedMedia.publicId);
    }

    const highlight = await createHighlight({
      title: title.trim(),
      athlete: athlete.trim(),
      mediaType,
      mediaUrl: uploadedMedia.mediaUrl,
      mediaPublicId: uploadedMedia.publicId,
      thumbnailUrl,
      thumbnailPublicId,
    });

    try {
      await createAdminActivity(
        req.admin!.adminId,
        "CREATE_HIGHLIGHT",
        highlight.id,
      );
    } catch (activityError) {
      console.error("Failed to create admin activity:", activityError);
    }

    res.status(201).json({
      success: true,
      message: "Highlight created successfully.",
      result: highlight,
    });
  } catch (error) {
    console.error(error);

    if (uploadedThumbnail) {
      try {
        await deleteHighlightThumbnail(uploadedThumbnail.publicId);
      } catch (cleanupError) {
        console.error("Failed to cleanup highlight thumbnail:", cleanupError);
      }
    }

    if (uploadedMedia) {
      try {
        await deleteHighlightMedia(uploadedMedia.publicId, mediaType);
      } catch (cleanupError) {
        console.error("Failed to cleanup highlight media:", cleanupError);
      }
    }

    res.status(500).json({
      success: false,
      message: "Could not create highlight.",
    });
  }
};

const updateHighlightController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({
      success: false,
      message: "Highlight ID must be a positive integer.",
    });
    return;
  }

  const { title, athlete } = (req.body ?? {}) as Record<string, unknown>;

  if (
    typeof title !== "string" ||
    typeof athlete !== "string" ||
    !title.trim() ||
    !athlete.trim()
  ) {
    res.status(400).json({
      success: false,
      message: "Title and athlete are required.",
    });
    return;
  }

  const files = (req.files ?? {}) as {
    media?: Express.Multer.File[];
    thumbnail?: Express.Multer.File[];
  };

  const mediaFile = files.media?.[0];
  const thumbnailFile = files.thumbnail?.[0];

  let uploadedMedia: {
    mediaUrl: string;
    publicId: string;
  } | null = null;

  let uploadedThumbnail: {
    thumbnailUrl: string;
    publicId: string;
  } | null = null;

  try {
    const existingHighlight = await getHighlightById(id);

    if (!existingHighlight) {
      res.status(404).json({
        success: false,
        message: "Highlight not found.",
      });
      return;
    }

    let mediaType = existingHighlight.media_type as "image" | "video";

    let mediaUrl = existingHighlight.media_url;
    let mediaPublicId = existingHighlight.media_public_id;

    let thumbnailUrl = existingHighlight.thumbnail_url;
    let thumbnailPublicId = existingHighlight.thumbnail_public_id;

    let shouldDeleteOldThumbnail = false;

    const newMediaType = mediaFile
      ? mediaFile.mimetype.startsWith("video/")
        ? "video"
        : "image"
      : mediaType;

    if (thumbnailFile && newMediaType !== "video") {
      res.status(400).json({
        success: false,
        message: "Thumbnail is only allowed for video highlights.",
      });
      return;
    }


    if (mediaFile) {
      mediaType = newMediaType;

      uploadedMedia = await uploadHighlightMedia(mediaFile.buffer, mediaType);

      mediaUrl = uploadedMedia.mediaUrl;
      mediaPublicId = uploadedMedia.publicId;


      if (mediaType === "video") {
        if (thumbnailFile) {

          uploadedThumbnail = await uploadHighlightThumbnail(
            thumbnailFile.buffer,
          );

          thumbnailUrl = uploadedThumbnail.thumbnailUrl;
          thumbnailPublicId = uploadedThumbnail.publicId;
        } else {

          thumbnailUrl = getHighlightVideoThumbnail(uploadedMedia.publicId);

          thumbnailPublicId = null;
        }
      } else {
        thumbnailUrl = null;
        thumbnailPublicId = null;
      }

      if (existingHighlight.thumbnail_public_id) {
        shouldDeleteOldThumbnail = true;
      }
    } else if (thumbnailFile) {

      uploadedThumbnail = await uploadHighlightThumbnail(thumbnailFile.buffer);

      thumbnailUrl = uploadedThumbnail.thumbnailUrl;
      thumbnailPublicId = uploadedThumbnail.publicId;

      if (existingHighlight.thumbnail_public_id) {
        shouldDeleteOldThumbnail = true;
      }
    }

    const updatedHighlight = await updateHighlight(id, {
      title: title.trim(),
      athlete: athlete.trim(),
      mediaType,
      mediaUrl,
      mediaPublicId,
      thumbnailUrl,
      thumbnailPublicId,
    });

    if (!updatedHighlight) {
      throw new Error("Highlight was not returned after update.");
    }

    if (uploadedMedia) {
      try {
        await deleteHighlightMedia(
          existingHighlight.media_public_id,
          existingHighlight.media_type as "image" | "video",
        );
      } catch (cleanupError) {
        console.error("Failed to cleanup old highlight media:", cleanupError);
      }
    }

    if (shouldDeleteOldThumbnail && existingHighlight.thumbnail_public_id) {
      try {
        await deleteHighlightThumbnail(existingHighlight.thumbnail_public_id);
      } catch (cleanupError) {
        console.error(
          "Failed to cleanup old highlight thumbnail:",
          cleanupError,
        );
      }
    }

    try {
      await createAdminActivity(
        req.admin!.adminId,
        "UPDATE_HIGHLIGHT",
        updatedHighlight.id,
      );
    } catch (activityError) {
      console.error("Failed to create admin activity:", activityError);
    }

    res.status(200).json({
      success: true,
      message: "Highlight updated successfully.",
      result: updatedHighlight,
    });
  } catch (error) {
    console.error(error);

    if (uploadedThumbnail) {
      try {
        await deleteHighlightThumbnail(uploadedThumbnail.publicId);
      } catch (cleanupError) {
        console.error(
          "Failed to cleanup new highlight thumbnail:",
          cleanupError,
        );
      }
    }

    if (uploadedMedia) {
      try {
        const newMediaType: "image" | "video" = mediaFile?.mimetype.startsWith(
          "video/",
        )
          ? "video"
          : "image";

        await deleteHighlightMedia(uploadedMedia.publicId, newMediaType);
      } catch (cleanupError) {
        console.error("Failed to cleanup new highlight media:", cleanupError);
      }
    }

    res.status(500).json({
      success: false,
      message: "Could not update highlight.",
    });
  }
};

const deleteHighlightController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({
      success: false,
      message: "Highlight ID must be a positive integer.",
    });

    return;
  }

  try {
    const deletedHighlight = await deleteHighlightById(id);

    if (!deletedHighlight) {
      res.status(404).json({
        success: false,
        message: "Highlight not found.",
      });

      return;
    }

    try {
      await deleteHighlightMedia(
        deletedHighlight.media_public_id,
        deletedHighlight.media_type as "image" | "video",
      );
    } catch (cleanupError) {
      console.error("Failed to delete highlight media:", cleanupError);
    }

    if (deletedHighlight.thumbnail_public_id) {
      try {
        await deleteHighlightThumbnail(deletedHighlight.thumbnail_public_id);
      } catch (cleanupError) {
        console.error("Failed to delete highlight thumbnail:", cleanupError);
      }
    }

    try {
      await createAdminActivity(
        req.admin!.adminId,
        "DELETE_HIGHLIGHT",
        deletedHighlight.id,
      );
    } catch (activityError) {
      console.error("Failed to create admin activity:", activityError);
    }

    res.status(200).json({
      success: true,
      message: "Highlight deleted successfully.",
      result: deletedHighlight,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Could not delete highlight.",
    });
  }
};

export {
  getHighlightsController,
  getHighlightController,
  createHighlightController,
  updateHighlightController,
  deleteHighlightController,
};
