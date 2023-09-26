import { getContrastColor } from "./theme";

describe("getContrastTextColor", () => {
  it("empty", () => {
    expect(() => getContrastColor("")).toThrowError("Missing HEX color!");
  });

  it("< 6 digits", () => {
    expect(() => getContrastColor("#93c41")).toThrowError("Invalid HEX color!");
  });

  it("black", () => {
    const ctxColor = getContrastColor("#000000");
    expect(ctxColor).toEqual("#FFFFFF");
  });

  it("dark - 6 digits", () => {
    const ctxColor = getContrastColor("#101a00");
    expect(ctxColor).toEqual("#FFFFFF");
  });

  it("white", () => {
    const ctxColor = getContrastColor("#FFFFFF");
    expect(ctxColor).toEqual("#000000");
  });
});
