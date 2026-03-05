import { useContext } from "react";
import { UploadContext } from "../upload.context";
import { uploadSong } from "../services/song.upload.api";

export function useUpload() {
    const context = useContext(UploadContext);

    if (!context) {
        throw new Error("useUpload must be used within UploadProvider");
    }

    const { upload, mood, setUpload, setMood, loading, setLoading } = context;

    const handleUpload = async ({ file, mood }) => {
        try {
            setLoading(true);
            const data = await uploadSong({ file, mood });
            setUpload(file);
            setMood(mood);
            return data;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { upload, mood, setUpload, setMood, loading, handleUpload };
}