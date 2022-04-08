import axios from "axios";
import { TMDB, CYBER_SOFT, TOKEN } from "../util/config";

class CyberSoftServices {
  get = (url) =>
    axios.get({
      url: `${CYBER_SOFT}/${url}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      },
    });

  post = (url, model) =>
    axios.post({
      url: `${CYBER_SOFT}/${url}`,
      data: model,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      },
    });

  put = (url, model) => {
    let promise = axios({
      url: `${CYBER_SOFT}/${url}`,
      method: "PUT",
      data: model,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      },
    });
    return promise;
  };

  delete = (url) => {
    let promise = axios({
      url: `${CYBER_SOFT}/${url}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      },
    });
    return promise;
  };

  getTMDB = (url) => {
    return axios({
      method: "GET",
      url: `${TMDB}${url}`,
    });
  };

  
}

export const cyberSoftServices = new CyberSoftServices();
