const parseSizes = (sizes: unknown): string[] | null => {
  if (typeof sizes !== "string") {
    return null;
  }

  try {
    const parsedSizes: unknown = JSON.parse(sizes);

    if (
      !Array.isArray(parsedSizes) ||
      !parsedSizes.every(
        (size) => typeof size === "string" && size.trim().length > 0,
      )
    ) {
      return null;
    }

    return parsedSizes.map((size) => size.trim());
  } catch {
    return null;
  }
};

const parseDeletedImageIds = (value: unknown): number[] | null => {
  if (value === undefined || value === "") {
    return [];
  }

  if (typeof value !== "string") {
    return null;
  }

  try {
    const parsed = JSON.parse(value);

    if (
      !Array.isArray(parsed) ||
      !parsed.every(
        (id) => Number.isSafeInteger(id) && id > 0,
      )
    ) {
      return null;
    }

    return [...new Set(parsed)];
  } catch {
    return null;
  }
};

export { parseSizes, parseDeletedImageIds };


