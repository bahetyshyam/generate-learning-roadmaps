import { RawNodeDatum } from "react-d3-tree";
import { TreeNode } from "../../types/TreeNode";

export const mapRoadmapToD3 = (roadmap: TreeNode): RawNodeDatum => {
  console.log(roadmap);
  let ptr = roadmap;
  const queue: TreeNode[] = [roadmap];
  while (queue.length) {
    // @ts-ignore
    ptr = queue.shift();
    if (!ptr) {
      continue;
    }
    const { title, description, resourceTasks, children, node_id } = ptr;
    // @ts-ignore
    ptr.name = title;
    // @ts-ignore
    ptr.attributes = {};

    // @ts-ignore
    if (description) ptr.attributes.description = description;
    if (resourceTasks)
      // @ts-ignore`
      ptr.attributes.resourceTasks = resourceTasks;
    if (children?.length) {
      children.forEach((child) => queue.push(child));
    }
    if (node_id) {
      // @ts-ignore
      ptr.attributes.node_id = node_id;
    }
  }
  //@ts-ignore
  return roadmap;
};
