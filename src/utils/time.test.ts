import { getValidTime } from "./time";

describe("getValidTime", () => {
  it("invalid", () => {
    expect(getValidTime(NaN)).not.toBe(NaN);
  });

  it("millis", () => {
    expect(getValidTime(1697531400000)).toEqual(1697531400000);
  });

  it("ISO", () => {
    expect(getValidTime("2023-10-28T22:00:00.000Z")).toEqual(1698530400000);
    expect(getValidTime("2023-10-29T00:00:00.000+02:00")).toEqual(1698530400000);
    expect(getValidTime("July 20, 69 20:17:40 GMT+00:00")).toEqual(-14182940000);
  });

  it("load - numbers", () => {
    const now = new Date().getTime();
    const dates = new Array(100000).fill(0).map((d) => {
      return Math.floor(Math.random() * now);
    });

    const start = new Date().valueOf();
    dates.forEach((d) => getValidTime(d));
    const end = new Date().valueOf();
    const operationLength = end - start;
    console.log(`Validate dates: ${operationLength} ms`);

    expect(operationLength).toBeLessThan(100);
  });

  it("load - strings", () => {
    const now = new Date().getTime();
    const dates = new Array(100000).fill(0).map((d) => {
      const millis = Math.floor(Math.random() * now);
      return new Date(millis).toISOString();
    });

    const start = new Date().valueOf();
    dates.forEach((d) => getValidTime(d));
    const end = new Date().valueOf();
    const operationLength = end - start;
    console.log(`Validate dates: ${operationLength} ms`);

    expect(operationLength).toBeLessThan(100);
  });
});
