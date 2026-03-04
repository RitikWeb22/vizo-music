import React, { useEffect, useRef, useState } from "react";
import { useSong } from "../hooks/useSong";
import "../styles/player.scss";

const Player = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState(1);

  const { songs } = useSong();

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      audio.volume = volume;
      audio.playbackRate = speed;
      audio.muted = isMuted;
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [volume, speed, isMuted]);

  // when song changes, reset and auto-play new song
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);

    const playNew = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // autoplay can be blocked by browser; keep paused in that case
        setIsPlaying(false);
      }
    };

    playNew();
  }, [songs?.url]);

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

  return (
    <div className="player">
      <img
        src={songs.posterUrl}
        alt={songs.title}
        className="player__poster"
      />

      <div className="player__main">
        <div className="player__header">
          <div className="player__title">{songs.title}</div>
          <div className="player__mood">{songs.mood}</div>
        </div>

        <input
          className="player__track"
          type="range"
          min={0}
          max={duration || 0}
          step={1}
          value={currentTime}
          onChange={handleSeek}
        />

        <div className="player__time">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
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
          <button onClick={handlePlayPause} className="player__play">
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <button
            onClick={() => handleFastForward(10)}
            className="player__ff"
          >
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

      <audio ref={audioRef} src={songs.url} preload="metadata" />
    </div>
  );
};

export default Player;
