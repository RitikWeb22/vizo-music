import { useState } from "react";
import { useUpload } from "../hooks/uploadAuth";
import "../styles/song.upload.scss";
import { useNavigate } from "react-router-dom";

const SongUpload = () => {
  const { handleUpload, loading } = useUpload();
  const [file, setFile] = useState(null);
  const [mood, setMood] = useState("happy");
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  const navigate = useNavigate();

  // Handle file selection with validation
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setUploadError("");
    setUploadSuccess("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    // Validate file type
    if (
      !selectedFile.type.includes("audio/mpeg") &&
      !selectedFile.name.endsWith(".mp3")
    ) {
      setUploadError("Please upload an MP3 file only");
      setFile(null);
      return;
    }

    // Validate file size (10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (selectedFile.size > maxSize) {
      setUploadError("File size must be less than 10MB");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  // Handle file upload submit
  const handleUploadSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setUploadError("Please select a file to upload");
      return;
    }

    setUploadError("");
    setUploadSuccess("");

    try {
      const response = await handleUpload({ file, mood });
      setUploadSuccess(`Song "${response.song.title}" uploaded successfully!`);
      setFile(null);
      setMood("happy");
      // Reset file input
      navigate("/");
      e.target.reset();
    } catch (error) {
      setUploadError(error.response?.data?.message || "Failed to upload song");
    }
  };

  return (
    <div className="upload-main">
      {/* Form 1: File Upload */}
      <div className="upload-container">
        <h2>🎵 Upload Your Song</h2>
        <form className="upload-form" onSubmit={handleUploadSubmit}>
          {/* File Upload */}
          <div className="form-group">
            <label htmlFor="song-file">Song File (MP3, Max 10MB)</label>
            <div className={`file-input-wrapper ${file ? "has-file" : ""}`}>
              <input
                type="file"
                id="song-file"
                accept=".mp3,audio/mpeg"
                onChange={handleFileChange}
              />
              <div className="file-input-content">
                <div className="file-icon">{file ? "✅" : "📁"}</div>
                <div className="file-text">
                  {file ? (
                    <>
                      <strong>{file.name}</strong>
                      <div className="file-info">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </div>
                    </>
                  ) : (
                    <>
                      <strong>Click to browse</strong> or drag and drop
                      <div className="file-info">MP3 files only, max 10MB</div>
                    </>
                  )}
                </div>
              </div>
            </div>
            {uploadError && <div className="error">{uploadError}</div>}
          </div>

          {/* Mood Selection */}
          <div className="form-group">
            <label htmlFor="mood">Song Mood</label>
            <select
              id="mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              required
            >
              <option value="happy">😊 Happy</option>
              <option value="sad">😢 Sad</option>
              <option value="surprised">😮 Surprised</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-btn"
            disabled={loading || !file}
          >
            {loading ? "Uploading..." : "Upload Song"}
          </button>

          {/* Success Message */}
          {uploadSuccess && (
            <div className="success-message">{uploadSuccess}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SongUpload;
