import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const appID = process.env.NEXT_PUBLIC_APP_ID;

export const axiosWithAppId = axios.create({
  baseURL,
  headers: {
    "app-id": appID,
  },
});
