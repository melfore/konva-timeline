export interface Resource {
  /**
   * Unique identifier of the resource
   */
  id: string;
  /**
   * Label of the resource
   */
  label: string;
  /**
   * Color assigned to the resource
   */
  color: string;
}

const RESOURCE_HEADER: Resource = {
  id: "-1",
  color: "transparent",
  label: "Header",
};

export const RESOURCE_HEADER_WIDTH = 200;

export const RESOURCE_TEXT_OFFSET = 12;

/**
 * Adds header resource to incoming list of resources
 * @param resources the list of all resources
 */
export const addHeaderResource = (resources: Resource[]): Resource[] => [RESOURCE_HEADER, ...resources];

/**
 * Finds resource index given a y coordinate. Used when determining the resource from pointer position.
 * Excludes the header resource, hence resources are considered index 1 based.
 * @param coordinate the y coordinate from pointer position
 * @param rowHeight the current height of rows
 * @param resources the list of all resources
 * @throws if resources is empty
 */
export const findResourceIndexByCoordinate = (coordinate: number, rowHeight: number, resources: Resource[]): number => {
  if (!resources || !resources.length) {
    // TODO#lb: improve adding KonvaTimeline error
    throw new Error("Resources is empty");
  }

  let resourceIndex = Math.floor(coordinate / rowHeight);
  if (resourceIndex < 1) {
    resourceIndex = 1;
  }

  if (resources.length <= resourceIndex) {
    resourceIndex = resources.length - 1;
  }

  return resourceIndex;
};

/**
 * Finds resource object given a y coordinate. Used when determining the resource from pointer position.
 * Excludes the header resource, hence resources are considered index 1 based.
 * @param coordinate the y coordinate from pointer position
 * @param rowHeight the current height of rows
 * @param resources the list of all resources
 */
export const findResourceByCoordinate = (coordinate: number, rowHeight: number, resources: Resource[]): Resource => {
  const resourceIndex = findResourceIndexByCoordinate(coordinate, rowHeight, resources);
  return resources[resourceIndex];
};
