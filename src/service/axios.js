import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

// make sure credentials are sent with every request

// instance.defaults.withCredentials = true;
export default instance;
