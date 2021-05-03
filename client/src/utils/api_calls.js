import axios from "axios";
import { getCookieValue } from "./helpers";

export const config = {
  // fetchUrl: "hhttp://jotternote.herokuapp.com",
  fetchUrl: "http://localhost:5000/api/v1",
};

export const callPlainApi = (url, data, method) =>
  new Promise((resolve, reject) => {
    const axiosOptions = { timeout: 30000 };
    if (method === "PUT") {
      axios
        .put(`${config.fetchUrl}${url}`, data, {
          timeout: axiosOptions.timeout,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    }
    if (method === "POST") {
      axios
        .post(`${config.fetchUrl}${url}`, data, {
          timeout: axiosOptions.timeout,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      axios
        .get(`${config.fetchUrl}${url}`, {
          timeout: axiosOptions.timeout,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });

export const callSecuredApi = (url, data, method, callback) => {
  const axiosOptions = {};
  const token = getCookieValue("tractrac");
  if (token) {
    axiosOptions.headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    axiosOptions.timeout = 20000;
  }
  return new Promise((resolve, reject) => {
    if (method === "PUT") {
      axiosOptions.method = "PUT";
      axiosOptions.body = data;
      axios
        .put(`${config.fetchUrl}${url}`, data, {
          headers: axiosOptions.headers,
          timeout: axiosOptions.timeout,
        })
        .then((response) => {
          if (callback) {
            callback();
          }
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    } else if (method === "POST") {
      axios
        .post(`${config.fetchUrl}${url}`, data, {
          headers: axiosOptions.headers,
          timeout: axiosOptions.timeout,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    } else if (method === "PATCH") {
      axios
        .patch(`${config.fetchUrl}${url}`, data, {
          headers: axiosOptions.headers,
          timeout: axiosOptions.timeout,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    } else if (method === "DELETE") {
      axios
        .delete(`${config.fetchUrl}${url}`, {
          headers: axiosOptions.headers,
          timeout: axiosOptions.timeout,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      axios
        .get(`${config.fetchUrl}${url}`, {
          headers: axiosOptions.headers,
          timeout: axiosOptions.timeout,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};
