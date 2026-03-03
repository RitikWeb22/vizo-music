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
  await videoRef.current.play();
};

export const detect = (landmarkerRef, videoRef) => {
  if (!landmarkerRef.current || !videoRef.current) return "No Face 😐";

  const results = landmarkerRef.current.detectForVideo(
    videoRef.current,
    performance.now(),
  );

  if (!results.faceBlendshapes?.length) return "No Face 😐";

  const blendshapes = results.faceBlendshapes[0].categories;

  const getScore = (name) =>
    blendshapes.find((b) => b.categoryName === name)?.score || 0;

  const smileLeft = getScore("mouthSmileLeft");
  const smileRight = getScore("mouthSmileRight");
  const jawOpen = getScore("jawOpen");
  const frownLeft = getScore("mouthFrownLeft");
  const frownRight = getScore("mouthFrownRight");
  const browDownLeft = getScore("browDownLeft");
  const browDownRight = getScore("browDownRight");
  const eyeBlinkLeft = getScore("eyeBlinkLeft");
  const eyeBlinkRight = getScore("eyeBlinkRight");

  if (smileLeft > 0.6 && smileRight > 0.6 && jawOpen > 0.4)
    return "Laughing 😂";

  if (smileLeft > 0.5 && smileRight > 0.5) return "Happy 😄";

  if (frownLeft > 0.5 && frownRight > 0.5) return "Sad 😢";

  if (browDownLeft > 0.6 && browDownRight > 0.6) return "Angry 😠";

  if (eyeBlinkLeft > 0.7 && eyeBlinkRight < 0.3) return "Wink 😉";

  if (jawOpen > 0.6) return "Surprised 😲";

  return "Neutral 😐";
};
