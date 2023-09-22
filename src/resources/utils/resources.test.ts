import { DEFAULT_GRID_ROW_HEIGHT } from "../../utils/dimensions";

import { addHeaderResource, findResourceByCoordinate, Resource } from "./resources";

let resources: Resource[] = [
  { id: "1", color: "red", label: "Resource #1" },
  { id: "2", color: "green", label: "Resource #2" },
  { id: "3", color: "blue", label: "Resource #3" },
];

beforeAll(() => {
  const initialLength = resources.length;
  resources = addHeaderResource(resources);
  expect(resources).toHaveLength(initialLength + 1);
});

describe("findResourceByCoordinate", () => {
  it("base", () => {
    const resourceId1 = findResourceByCoordinate(27, DEFAULT_GRID_ROW_HEIGHT, resources);
    expect(resourceId1).toEqual(resources[1]);

    const resourceId2 = findResourceByCoordinate(82, DEFAULT_GRID_ROW_HEIGHT, resources);
    expect(resourceId2).toEqual(resources[1]);

    const resourceId3 = findResourceByCoordinate(118, DEFAULT_GRID_ROW_HEIGHT, resources);
    expect(resourceId3).toEqual(resources[2]);

    const resourceId4 = findResourceByCoordinate(173, DEFAULT_GRID_ROW_HEIGHT, resources);
    expect(resourceId4).toEqual(resources[3]);
  });

  it("negative", () => {
    const resource = findResourceByCoordinate(-10, DEFAULT_GRID_ROW_HEIGHT, resources);
    expect(resource).toEqual(resources[1]);
  });

  it("low bound", () => {
    const lowBound = 0 * DEFAULT_GRID_ROW_HEIGHT;
    const resource = findResourceByCoordinate(lowBound, DEFAULT_GRID_ROW_HEIGHT, resources);
    expect(resource).toEqual(resources[1]);
  });

  it("high bound", () => {
    const highBound = resources.length * DEFAULT_GRID_ROW_HEIGHT;
    const resource = findResourceByCoordinate(highBound, DEFAULT_GRID_ROW_HEIGHT, resources);

    expect(resource).toEqual(resources[3]);
  });
});
