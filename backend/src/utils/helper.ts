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

export { parseSizes };
