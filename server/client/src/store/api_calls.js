import axios from "axios";

export const route = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 30000,
});
