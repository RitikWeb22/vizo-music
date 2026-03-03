import { useEffect, useRef, useState } from "react";
import { init, detect } from "../utils/utils";
import Navbar from "./Navbar";

const ExpressionTrack = () => {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const [expression, setExpression] = useState("Moodify face detecting...");

  useEffect(() => {
    const start = async () => {
      await init(landmarkerRef, videoRef);
    };

    start();

    return () => {
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleDetect = () => {
    const result = detect(landmarkerRef, videoRef);
    setExpression(result);
  };

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center" }}>
        <video
          ref={videoRef}
          style={{ width: "400px", borderRadius: "12px" }}
          playsInline
          autoPlay
        />
        <h2>{expression}</h2>

        <button onClick={handleDetect} className="button btn-primary">
          Detect Face Expression
        </button>
      </div>
    </>
  );
};

export default ExpressionTrack;
