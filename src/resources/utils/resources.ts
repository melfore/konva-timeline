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

export const RESOURCE_HEADER_WIDTH = 200;

export const RESOURCE_HEADER: Resource = {
  color: "transparent",
  id: "-1",
  label: "Header",
};
