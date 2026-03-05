import { createContext, useState } from "react";

export const UploadContext = createContext();

export const UploadProvider = ({ children }) => {
  const [upload, setUpload] = useState(null);
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <UploadContext.Provider
      value={{ upload, mood, setUpload, setMood, loading, setLoading }}
    >
      {children}
    </UploadContext.Provider>
  );
};
