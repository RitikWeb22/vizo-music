import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const init = async (landmarkerRef, videoRef) => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
  );

  landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
    },
    outputFaceBlendshapes: true,
    runningMode: "VIDEO",
    numFaces: 1,
  });

  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  videoRef.current.srcObject = stream;

  try {
    await videoRef.current.play();
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error("Error playing video:", error);
    }
  }
};

export const detect = (landmarkerRef, videoRef, currentExpression, setCurrentExpression) => {
  if (!landmarkerRef.current || !videoRef.current) {
    if (currentExpression !== "No Face 😐") {
      setCurrentExpression("No Face 😐");
    }
    return;
  }

  const results = landmarkerRef.current.detectForVideo(
    videoRef.current,
    performance.now(),
  );

  if (!results.faceBlendshapes?.length) {
    if (currentExpression !== "No Face 😐") {
      setCurrentExpression("No Face 😐");
    }
    return;
  }

  const blendshapes = results.faceBlendshapes[0].categories;

  const getScore = (name) =>
    blendshapes.find((b) => b.categoryName === name)?.score || 0;

  const smileLeft = getScore("mouthSmileLeft");
  const smileRight = getScore("mouthSmileRight");
  const jawOpen = getScore("jawOpen");
  const frownLeft = getScore("mouthFrownLeft");
  const frownRight = getScore("mouthFrownRight");
  const browUp = getScore("browInnerUp");

  let detectedExpression = "neutral";

  if (smileLeft > 0.5 && smileRight > 0.5) {
    detectedExpression = "happy";
  } else if (frownLeft > 0.0001 && frownRight > 0.0001) {
    detectedExpression = "sad";
  } else if (jawOpen > 0.1 && browUp > 0.0001) {
    detectedExpression = "surprised";
  }

  if (currentExpression !== detectedExpression) {
    setCurrentExpression(detectedExpression);
  }

  return detectedExpression;
};
