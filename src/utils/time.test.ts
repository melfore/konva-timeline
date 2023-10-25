import { getValidTime } from "./time";

describe("getValidTime", () => {
  it("invalid", () => {
    expect(getValidTime(NaN, "utc")).toBe(NaN);
  });

  it("millis", () => {
    expect(getValidTime(1697531400000, "utc")).toEqual(1697531400000);
  });

  it("ISO from UTC to machine", () => {
    expect(getValidTime("2023-10-19T00:00:00.000Z", undefined)).toEqual(1697673600000);
    expect(getValidTime("2023-10-19T00:00:00.000Z", "utc")).toEqual(1697673600000);
  });

  it("ISO from machine to machine", () => {
    expect(getValidTime("2023-10-19T00:00:00.000+02:00", undefined)).toEqual(1697666400000);
    expect(getValidTime("2023-10-19T00:00:00.000+02:00", "utc")).toEqual(1697666400000);
  });

  it("ISO from any to any", () => {
    expect(getValidTime("2023-10-19T00:00:00.000+02:00", "America/New_York")).toEqual(1697666400000);
  });

  it("load - numbers", () => {
    const now = new Date().getTime();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dates = new Array(10000).fill(0).map((_d) => {
      return Math.floor(Math.random() * now);
    });

    const start = new Date().valueOf();
    dates.forEach((d) => getValidTime(d, "utc"));
    const end = new Date().valueOf();
    const operationLength = end - start;
    console.warn(`Validate dates Number: ${operationLength} ms`);
    expect(operationLength).toBeLessThan(500);
  });

  it("load - strings", () => {
    const now = new Date().getTime();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dates = new Array(10000).fill(0).map((_d) => {
      const millis = Math.floor(Math.random() * now);
      return new Date(millis).toISOString();
    });

    const start = new Date().valueOf();
    dates.forEach((d) => getValidTime(d, "utc"));
    const end = new Date().valueOf();
    const operationLength = end - start;
    console.warn(`Validate dates String: ${operationLength} ms`);
    expect(operationLength).toBeLessThan(500);
  });

  it("load - Date", () => {
    const now = new Date().getTime();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dates = new Array(10000).fill(0).map((_d) => {
      const millis = Math.floor(Math.random() * now);
      return new Date(millis);
    });

    const start = new Date().valueOf();
    dates.forEach((d) => getValidTime(d, "utc"));
    const end = new Date().valueOf();
    const operationLength = end - start;
    console.warn(`Validate dates Date: ${operationLength} ms`);
    expect(operationLength).toBeLessThan(500);
  });
});
