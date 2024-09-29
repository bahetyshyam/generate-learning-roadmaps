export type TreeNode = {
  title: string;
  description?: string;
  resourceTasks?: {
    name: string;
    resourceLink: string;
    completed: boolean;
  }[];
  children: TreeNode[];
};
