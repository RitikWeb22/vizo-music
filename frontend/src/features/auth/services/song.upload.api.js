import axios from "axios";

const api = axios.create({
    baseURL: "https://vizo-5kkc.onrender.com/api/songs",
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
