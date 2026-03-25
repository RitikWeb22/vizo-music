import React, { useEffect, useRef, useState } from "react";
import { useSong } from "../hooks/useSong";
import { useFavorites } from "../hooks/useFavorites";
import "../styles/player.scss";

const Player = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState(1);

  const { songs, shouldAutoplay, clearAutoplay } = useSong();
  const { isFavorite, toggleFavorite } = useFavorites();

  const updateDuration = () => {
    if (!audioRef.current) return;
    const d = audioRef.current.duration;
    if (typeof d === "number" && !Number.isNaN(d) && isFinite(d)) {
      setDuration(d);
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const onLoadedMetadata = updateDuration;
    const onLoadedData = updateDuration;
    const onDurationChange = updateDuration;
    const onTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.volume = volume;
    audio.playbackRate = speed;
    audio.muted = isMuted;

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("loadeddata", onLoadedData);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("loadeddata", onLoadedData);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [volume, speed, isMuted]);

  // when song changes, reset and optionally autoplay
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    setDuration(0);
    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(false);

    if (shouldAutoplay && songs?.url) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          clearAutoplay();
        })
        .catch(() => clearAutoplay());
    }
  }, [songs?.url, shouldAutoplay]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleFastForward = (seconds = 10) => {
    if (!audioRef.current) return;
    const nextTime = Math.min(
      (audioRef.current.currentTime || 0) + seconds,
      duration || audioRef.current.duration || 0,
    );
    audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleRewind = (seconds = 10) => {
    if (!audioRef.current) return;
    const nextTime = Math.max((audioRef.current.currentTime || 0) - seconds, 0);
    audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const value = Number(e.target.value);
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const handleVolumeChange = (e) => {
    if (!audioRef.current) return;
    const value = Number(e.target.value);
    setVolume(value);
    audioRef.current.volume = value;
    if (value === 0) {
      setIsMuted(true);
      audioRef.current.muted = true;
    } else {
      setIsMuted(false);
      audioRef.current.muted = false;
    }
  };

  const handleToggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioRef.current.muted = nextMuted;
  };

  const handleSpeedChange = (e) => {
    if (!audioRef.current) return;
    const value = Number(e.target.value);
    setSpeed(value);
    audioRef.current.playbackRate = value;
  };

  const formatTime = (t) => {
    if (!t || Number.isNaN(t)) return "0:00";
    const minutes = Math.floor(t / 60);
    const seconds = Math.floor(t % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  if (!songs) return null;

  const hasTrack = Boolean(songs.url);

  return (
    <div className={`player ${!hasTrack ? "player--empty" : ""}`}>
      <img
        src={songs.posterUrl || "https://placehold.co/72x72/1f2937/4ade80?text=♫"}
        alt={songs.title}
        className="player__poster"
      />

      <div className="player__main">
        <div className="player__header">
          <div className="player__title">{songs.title}</div>
          <div className="player__header-right">
            <button
              type="button"
              className={`player__favorite ${isFavorite(songs) ? "player__favorite--active" : ""}`}
              onClick={() => toggleFavorite(songs)}
              disabled={!hasTrack}
              title={isFavorite(songs) ? "Remove from favorites" : "Add to favorites"}
            >
              ♥
            </button>
            <span className="player__mood">{songs.mood}</span>
          </div>
        </div>

        <input
          className="player__track"
          type="range"
          min={0}
          max={Math.max(duration || 0, 1)}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
          disabled={!hasTrack}
          style={{
            background: `linear-gradient(to right, #22c55e 0%, #22c55e ${(currentTime / Math.max(duration || 1, 1)) * 100}%, rgba(31, 41, 55, 0.9) ${(currentTime / Math.max(duration || 1, 1)) * 100}%, rgba(31, 41, 55, 0.9) 100%)`,
          }}
        />

        <div className="player__time">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration) || "0:00"}</span>
        </div>
      </div>

      <div className="player__controls">
        <div className="player__controls-main">
          <button
            onClick={() => handleRewind(10)}
            className="player__skip player__skip--back"
          >
            −10s
          </button>
          <button
            onClick={handlePlayPause}
            className="player__play"
            disabled={!hasTrack}
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <button onClick={() => handleFastForward(10)} className="player__ff">
            +10s
          </button>
        </div>

        <div className="player__controls-secondary">
          <button
            type="button"
            onClick={handleToggleMute}
            className="player__mute"
          >
            {isMuted || volume === 0 ? "🔇" : "🔊"}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            className="player__volume"
          />
          <select
            className="player__speed"
            value={speed}
            onChange={handleSpeedChange}
          >
            <option value={0.75}>0.75x</option>
            <option value={1}>1x</option>
            <option value={1.25}>1.25x</option>
            <option value={1.5}>1.5x</option>
          </select>
        </div>
      </div>

      {hasTrack && (
        <audio
          ref={audioRef}
          src={songs.url}
          preload="auto"
        />
      )}
    </div>
  );
};

export default Player;
