import { addHeaderResource, Resource } from "./resources";

const resources: Resource[] = [
  { id: "1", color: "red", label: "Resource #1" },
  { id: "2", color: "green", label: "Resource #2" },
  { id: "3", color: "blue", label: "Resource #3" },
];

describe("addHeaderResource", () => {
  it("", () => {
    const enrichedResources = addHeaderResource(resources);
    expect(enrichedResources).toHaveLength(resources.length + 1);
  });
});
