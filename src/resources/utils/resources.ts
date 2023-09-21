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
