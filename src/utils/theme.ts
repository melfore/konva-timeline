const HEX_BASE = 16;
const HEX_COLOR_LENGTH = 6;

const LUMA_FACTOR_R = 299;
const LUMA_FACTOR_G = 587;
const LUMA_FACTOR_B = 114;
const LUMA_FACTOR_BW = 128;
export const DEFAULT_ROW_LIGHT_MODE = "#F0F0F0";
export const ALTERNATIVE_ROW = "transparent";
export const DEFAULT_ROW_DARK_MODE = "#A8A8A8";
export const DEFAULT_STROKE_LIGHT_MODE = "grey";
export const DEFAULT_STROKE_DARK_MODE = "white";

export const getRGB = (hex: string) => {
  if (!hex || !hex.length) {
    throw new Error("Missing HEX color!");
  }

  let hexColor = hex;
  if (hexColor.indexOf("#") === 0) {
    hexColor = hexColor.slice(1);
  }

  if (hexColor.length === HEX_COLOR_LENGTH / 2) {
    hexColor = `${hexColor[0]}${hexColor[0]}${hexColor[1]}${hexColor[1]}${hexColor[2]}${hexColor[2]}`;
  }

  if (hexColor.length !== HEX_COLOR_LENGTH) {
    throw new Error("Invalid HEX color!");
  }

  const r = parseInt(hexColor.substring(0, 2), HEX_BASE);
  const g = parseInt(hexColor.substring(2, 4), HEX_BASE);
  const b = parseInt(hexColor.substring(4, 6), HEX_BASE);

  return { r: r, g: g, b: b };
};

export const getRGBA = (hex: string) => {
  if (!hex || !hex.length) {
    throw new Error("Missing HEX color!");
  }

  let hexColor = hex;
  if (hexColor.indexOf("#") === 0) {
    hexColor = hexColor.slice(1);
  }

  if (hexColor.length === HEX_COLOR_LENGTH / 2) {
    hexColor = `${hexColor[0]}${hexColor[0]}${hexColor[1]}${hexColor[1]}${hexColor[2]}${hexColor[2]}`;
  }
  if (hexColor.length === HEX_COLOR_LENGTH + 2) {
    const r = parseInt(hexColor.substring(0, 2), HEX_BASE);
    const g = parseInt(hexColor.substring(2, 4), HEX_BASE);
    const b = parseInt(hexColor.substring(4, 6), HEX_BASE);
    const a = parseInt(hexColor.substring(6, 8)) / 100;
    return { r: r, g: g, b: b, a: a };
  }

  if (hexColor.length !== HEX_COLOR_LENGTH) {
    throw new Error("Invalid HEX color!");
  }

  const r = parseInt(hexColor.substring(0, 2), HEX_BASE);
  const g = parseInt(hexColor.substring(2, 4), HEX_BASE);
  const b = parseInt(hexColor.substring(4, 6), HEX_BASE);

  return { r: r, g: g, b: b };
};

/**
 * Gets the black / white contrast color for given color
 * @param hex the color to be contrasted in hex format (e.g. '#000000')
 */
export const getContrastColor = (hex: string) => {
  const rgb = getRGB(hex);
  const luma = (rgb.r * LUMA_FACTOR_R + rgb.g * LUMA_FACTOR_G + rgb.b * LUMA_FACTOR_B) / 1000;

  return luma >= LUMA_FACTOR_BW ? "#000000" : "#FFFFFF";
};
