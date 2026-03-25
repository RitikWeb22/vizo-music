import axios from "axios";
import { API } from "../../../config/api";

const api = axios.create({
  baseURL: API.base,
  withCredentials: true,
});

export async function songFetch({ mood }) {
  const response = await api.get(`/songs?mood=${encodeURIComponent(mood)}`);
  return response.data;
}