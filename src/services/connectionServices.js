import axios from "axios";
import { API_CONNECTION } from "../utils/config";

class ConnectionService {
  get = () => {
    return axios({
      url: API_CONNECTION,
      method: "GET",
    });
  };

  post = (formData) =>
    axios({
      url: `${API_CONNECTION}`,
      method: "POST",
      data: formData,
    });

  put = (formData, id) => {
    return axios({
      url: `${API_CONNECTION}/${id}`,
      method: "PUT",
      data: formData,
    });
  };

  delete = (id) =>
    axios({
      method: "DELETE",
      url: `${API_CONNECTION}/${id}`,
    });
}

export const connectionService = new ConnectionService();
