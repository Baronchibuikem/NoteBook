import axios from "axios";

export const route = axios.create({
  baseURL: "https://jotternote.herokuapp.com",
  timeout: 30000,
});
