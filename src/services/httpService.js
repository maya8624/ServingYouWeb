import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("error".error);
    toast.error("An unexpected error occurred.");
  }

  return Promise.reject(error);
});

export default {
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  all: axios.all,
};
