import { useEffect, useRef, useState } from "react";
import { init, detect } from "../utils/utils";

const Expression = ({ onClick = () => {} }) => {
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
    const songs = detect(landmarkerRef, videoRef, expression, setExpression);

    onClick(songs);
  };

  return (
    <>
      <main className="expression-page">
        <section className="expression-card">
          <div className="expression-video-wrapper">
            <video ref={videoRef} className="expression-video" playsInline />
          </div>

          <div className="expression-status">
            <span>{expression}</span>
          </div>

          <div className="expression-actions">
            <button onClick={handleDetect} className="button btn-primary btn">
              Detect Face Expression
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Expression;
