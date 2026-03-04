import React from "react";
import Player from "../components/player";

import { useSong } from "../hooks/useSong";
import Expression from "../../faceExpressions/components/ExpressionTrack";
const Home = () => {
  const { handleGetSong } = useSong();
  return (
    <div>
      <Expression onClick={(songs) => handleGetSong({ mood: songs })} />
      <Player />
    </div>
  );
};

export default Home;
