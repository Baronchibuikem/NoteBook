import axios from "axios";

export const route = axios.create({
  baseURL: "http://jotternote.herokuapp.com",
  timeout: 30000,
});
