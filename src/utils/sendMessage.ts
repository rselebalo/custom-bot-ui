import axios from "axios";
import { HTTP_API_ENDPOINT } from "../constants";
import { IResponse } from "../interfaces";

export const sendMessage = async (message: string) => {
  try {
    const result = await axios.request({
      method: "POST",
      url: `${HTTP_API_ENDPOINT}/in-app-bot`,
      data: { Body: message, From: sessionStorage.getItem("username") },
      headers: { "content-type": "application/json" },
    });

    const response: IResponse = result.data;
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};
