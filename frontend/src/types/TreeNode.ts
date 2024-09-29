export type TreeNode = {
  node_id: string;
  title: string;
  description?: string;
  resourceTasks?: ResourceTask[];
  children: TreeNode[];
};

export type ResourceTask = {
  name: string;
  resourceLink: string;
  completed: boolean;
}[];
