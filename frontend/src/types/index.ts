import { TreeNode } from "./TreeNode";

export type LoginOrSignUpRequest = {
  userId: string;
  password: string;
};

export type LoginOrSignUpResponse = {
  userId: string;
};

export type RoadmapItem = {
  id: string;
  topic: string;
  expertise: number;
  roadmapJson: string;
};

//Gets the list of all roadmaps
// GET -> api/roadmaps?userId=...
export type RoadmapsResponse = RoadmapItem[];

//Create a new roadmap
// POST -> api/roadmaps/
export type CreateRoadmapRequest = {
  language: string;
  topic: string;
  expertise: number;
};

export type CreateRoadmapResponse = RoadmapItem;

//Update the current roadmap PUT Request
// This is required to update the json which will contain if the user has completed tasks in the roadmap or not (which is a boolean value)
// PUT -> api/roadmaps/:id
export type UpdateRoadmapRequest = {
  jsonString: string;
};

//Delete the current roadmap DELETE Request
// DELETE -> api/roadmaps/:id
export type DeleteRoadmapRequest = {
  id: string;
};

export type DeleteRoadmapResponse = {
  message: string;
};

export type UpdateRoadmapResponse = RoadmapItem;

export type Form = {
  quest: string;
  desc: string;
} & (
  | {
      type: "string";
      value?: string;
    }
  | {
      type: "number";
      value?: number;
    }
);

export type RoadMapSummary = {
  user: number;
  roadmap: string;
  topic: string;
  expertise: number;
};

export type RoadMapCreationResponse = {
  id: string;
  roadmap_json: TreeNode;
};
