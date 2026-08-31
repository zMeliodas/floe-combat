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
  try {
    const {
      title,
      athlete,
      media_type,
      media_url,
      media_public_id,
      thumbnail_url,
      thumbnail_public_id,
    } = req.body;

    if (!title || !athlete || !media_type || !media_url || !media_public_id) {
      return res.status(400).json({
        success: false,
        message: "Missing required highlight fields.",
      });
    }

    if (media_type !== "image" && media_type !== "video") {
      return res.status(400).json({
        success: false,
        message: "Invalid media type.",
      });
    }

    const finalThumbnailUrl =
      thumbnail_url ||
      (media_type === "video"
        ? getHighlightVideoThumbnail(media_public_id)
        : null);

    const highlight = await createHighlight({
      title,
      athlete,
      mediaType: media_type,
      mediaUrl: media_url,
      mediaPublicId: media_public_id,
      thumbnailUrl: finalThumbnailUrl,
      thumbnailPublicId: thumbnail_public_id ?? null,
    });

    return res.status(201).json({
      success: true,
      message: "Highlight created successfully.",
      result: highlight,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Could not create highlight.",
    });
  }
};

const updateHighlightController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid highlight ID.",
      });
    }

    const existingHighlight = await getHighlightById(id);

    if (!existingHighlight) {
      return res.status(404).json({
        success: false,
        message: "Highlight not found.",
      });
    }

    const {
      title,
      athlete,
      media_type,
      media_url,
      media_public_id,
      thumbnail_url,
      thumbnail_public_id,
    } = req.body;

    if (!title || !athlete) {
      return res.status(400).json({
        success: false,
        message: "Title and athlete are required.",
      });
    }

    if (media_type && media_type !== "image" && media_type !== "video") {
      return res.status(400).json({
        success: false,
        message: "Invalid media type.",
      });
    }

    const finalThumbnailUrl =
      thumbnail_url ||
      (media_type === "video" && media_public_id
        ? getHighlightVideoThumbnail(media_public_id)
        : undefined);

    const updatedHighlight = await updateHighlight(id, {
      title,
      athlete,
      mediaType: media_type,
      mediaUrl: media_url,
      mediaPublicId: media_public_id,
      thumbnailUrl: finalThumbnailUrl,
      thumbnailPublicId: thumbnail_public_id,
    });

    if (!updatedHighlight) {
      return res.status(404).json({
        success: false,
        message: "Highlight not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Highlight updated successfully.",
      result: updatedHighlight,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
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
