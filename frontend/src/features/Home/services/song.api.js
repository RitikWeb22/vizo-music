import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
})

// fetching song

export async function songFetch({ mood }) {
    const response = await api.get("/songs?mood=" + mood)
    console.log(response)
    return response.data
}