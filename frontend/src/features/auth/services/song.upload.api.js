import axios from "axios";
import { API } from "../../../config/api";

const api = axios.create({
  baseURL: API.songs,
  withCredentials: true,
});

// Upload song
export async function uploadSong({ file, mood }) {
    const formData = new FormData();
    formData.append("song", file);
    formData.append("mood", mood);

    const response = await api.post("/upload-song", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}
