import axios from "axios";
import { HTTP_API_ENDPOINT } from "../constants";

export const fetchInteractions = async () => {
  try {
    const result = await axios.request({
      method: "GET",
      url: `${HTTP_API_ENDPOINT}/interactions`,
      headers: { "content-type": "application/json" },
    });

    const response = result.data;
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};
