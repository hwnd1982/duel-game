export type RGB = {
  r: string;
  g: string;
  b: string;
};
export const RGBToHex = ({ r, g, b }: RGB) =>
  `#${(+r).toString(16).padStart(2, "0")}${(+g).toString(16).padStart(2, "0")}${(+b).toString(16).padStart(2, "0")}`;

export const hexToRGB = (hex: string) => {
  const [r, g, b] = hex
    .replace(/^#(.{2})(.{2})(.{2})$/g, (_, r, g, b) => `${parseInt(r, 16)},${parseInt(g, 16)},${parseInt(b, 16)}`)
    .split(",");

  return { r, g, b };
};
