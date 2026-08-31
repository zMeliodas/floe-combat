import type {
  Highlight,
  HighlightResponse,
  HighlightsResponse,
  CreateHighlightInput,
  UpdateHighlightInput,
} from "../types/types";

const API_URL = import.meta.env.VITE_API_URL;

const getHighlights = async (): Promise<Highlight[]> => {
  const response = await fetch(`${API_URL}/highlights`);

  const data: HighlightsResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch highlights.");
  }

  return data.result;
};

const createHighlight = async (
  highlight: CreateHighlightInput,
): Promise<Highlight> => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    throw new Error("You are not logged in.");
  }

  const formData = new FormData();

  formData.append("title", highlight.title);
  formData.append("athlete", highlight.athlete);
  formData.append("media", highlight.media);

  if (highlight.thumbnail) {
    formData.append("thumbnail", highlight.thumbnail);
  }

  const response = await fetch(`${API_URL}/highlights`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data: HighlightResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create highlight.");
  }

  return data.result;
};

const updateHighlight = async (
  id: number,
  highlight: UpdateHighlightInput,
): Promise<Highlight> => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    throw new Error("You are not logged in.");
  }

  const formData = new FormData();

  formData.append("title", highlight.title);
  formData.append("athlete", highlight.athlete);

  if (highlight.media) {
    formData.append("media", highlight.media);
  }

  if (highlight.thumbnail) {
    formData.append("thumbnail", highlight.thumbnail);
  }

  const response = await fetch(`${API_URL}/highlights/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data: HighlightResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update highlight.");
  }

  return data.result;
};

const deleteHighlight = async (id: number): Promise<Highlight> => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    throw new Error("You are not logged in.");
  }

  const response = await fetch(`${API_URL}/highlights/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: HighlightResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete highlight.");
  }

  return data.result;
};

export { getHighlights, createHighlight, updateHighlight, deleteHighlight };
