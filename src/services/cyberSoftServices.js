import axios from "axios";
import { TMDB, CYBER_SOFT, TOKEN } from "../utils/config";

class CyberSoftServices {
  get = (url) =>
    axios({
      url: `${CYBER_SOFT}/${url}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      },
    });

  post = (url, model) =>
    axios({
      url: `${CYBER_SOFT}/${url}`,
      method: "POST",
      data: model,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      },
    });
  put = (url, model) =>
    axios({
      url: `${CYBER_SOFT}/${url}`,
      method: "PUT",
      data: model,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      },
    });

  delete = (url) =>
    axios({
      url: `${CYBER_SOFT}/${url}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      },
    });

  getTMDB = (url) => {
    return axios({
      method: "GET",
      url: `${TMDB}${url}`,
    });
  };
}

export const cyberSoftServices = new CyberSoftServices();
