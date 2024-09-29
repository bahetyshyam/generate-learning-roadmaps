import { RawNodeDatum } from "react-d3-tree";
import { TreeNode } from "../../types/TreeNode";

export const mapRoadmapToD3 = (roadmap: TreeNode): RawNodeDatum => {
  let root: RawNodeDatum = {
    name: "",
  };
  let ptr = root;
  const queue: TreeNode[] = [roadmap];
  while (queue.length) {
    const node = queue.shift();
    if (!node) {
      continue;
    }
    const { title, description, resourceTasks, children } = node;
    ptr.name = title;
    ptr.attributes = {};
    if (description) ptr.attributes.description = description;
    if (resourceTasks)
      // @ts-ignore
      ptr.attributes.resourceTasks = resourceTasks;
    if (children?.length) {
      children.forEach((child) => queue.push(child));
    }
  }
  return root;
};
