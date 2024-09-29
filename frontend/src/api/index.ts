import { Form } from "../types";

type LoginResponse =
  | {
      error: string;
    }
  | {
      user_id: number;
      message: string;
    };

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

export const getUserRoadmaps = async () => {
  const res = await fetch(API_URL + "userroadmaps/?user_id=4", {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      // "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  console.log(await res.json());
};

// getUserRoadmaps();
// export const createRoadmap = async (formData: Record<number, Form>) => {
//   const { value: topic } = formData[0];
//   const { value: expertise } = formData[1];
//   const headers = new Headers();
//   headers.append("Content-Type", "application/json");

//   const res = await fetch(API_URL + "", {
//     url: API_URL,
//     method: "post",
//     headers,
//     mode: "cors",
//     // @ts-ignore
//     body: JSON.stringify({
//       topic,
//       expertise,
//       userId: "ronit",
//       language: "en",
//     }),
//   });
//   console.log(await res.json());
// };
