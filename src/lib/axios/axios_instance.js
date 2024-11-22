import axios from "axios";
import { onRequestError, onRequestFulfilled } from "./request_handler";
import { onResponseError, onResponseFulfilled } from "./response_handler";
import { baseURL } from "../../constants/index";

export const axiosInstance = axios.create({
  baseURL,
  "Content-Type": "application/json",
});

axiosInstance.interceptors.request.use(onRequestFulfilled, onRequestError);
axiosInstance.interceptors.response.use(onResponseFulfilled, onResponseError);
