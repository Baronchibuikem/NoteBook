import axios from "axios";

export const route = axios.create({
  baseURL: "http://localhost:9000",
  timeout: 30000,
});
