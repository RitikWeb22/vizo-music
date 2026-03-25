import React from "react";
import { useSong } from "../hooks/useSong";
import Expression from "../../faceExpressions/components/ExpressionTrack";
import "../styles/home.scss";

const Home = () => {
  const { handleGetSong, loading } = useSong();
  return (
    <div className="home-page">
      <Expression
        onClick={(mood) => handleGetSong({ mood })}
        loading={loading}
      />
    </div>
  );
};

export default Home;
