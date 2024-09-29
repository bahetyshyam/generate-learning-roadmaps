import { Form, RoadMapCreationResponse, RoadMapSummary } from "../types";

type LoginResponse =
  | {
      error: string;
    }
  | {
      user_id: number;
      message: string;
    };

type RoadMapResponse = {
  results: RoadMapSummary[];
} | null;
const API_URL =
  "https://cors-anywhere.herokuapp.com/https://4d2e-131-94-186-13.ngrok-free.app/api/";

export const login = async (username: string, password: string) => {
  const res = await fetch(API_URL + "login/", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const json = (await res.json()) as LoginResponse;
  if ("error" in json) {
    return;
  }
  if (json.user_id && typeof json.user_id === "number") {
    return json.user_id;
  }
};

export const getUserRoadmaps = async (userId: number) => {
  const res = await fetch(API_URL + `userroadmaps/?user_id=${userId}`, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      "Access-Control-Allow-Origin": "*",
    },
  });
  const jsonRes = (await res.json()) as RoadMapResponse;
  if (jsonRes) {
    localStorage.setItem(userId.toString(), JSON.stringify(jsonRes.results));
  }
  return jsonRes?.results;
};

export const getRoadmapById = async (roadmapId: string) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "ngrok-skip-browser-warning": "69420",
  };
  const res = await fetch(API_URL + `roadmaps/${roadmapId}`, {
    headers,
  });
  return (await res?.json()) as RoadMapResponse;
};

export const createRoadmap = async (
  userId: number,
  formData: Record<number, Form>
) => {
  const { value: topic } = formData[0];
  const { value: expertise } = formData[1];
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  const res = await fetch(API_URL + "userroadmaps/", {
    method: "post",
    headers,
    mode: "cors",
    body: JSON.stringify({
      topic,
      expertise,
      user_id: userId,
      language: "en", // TODO: Store in context and read from there.
    }),
  });

  return (await res.json()) as RoadMapCreationResponse;
};
