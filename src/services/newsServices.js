import axios from "axios";
import { API_NEWS } from "../utils/config";

class NewsService {
  get = (url = "") => {
    if (url !== "") {
      return axios({
        url: `${API_NEWS}/${url}`,
        method: "GET",
      });
    }
    return axios({
      url: API_NEWS,
      method: "GET",
    });
  };

  post = (formData) =>
    axios({
      url: `${API_NEWS}/news/`,
      method: "POST",
      data: formData,
    });

  put = (formData, id) => {
    return axios({
      url: `${API_NEWS}/news/${id}`,
      method: "PUT",
      data: formData,
    });
  };

  delete = (id) =>
    axios({
      method: "DELETE",
      url: `${API_NEWS}/news/${id}`,
    });
}

export const newsService = new NewsService();
