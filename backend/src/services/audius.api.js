/**
 * Audius Music API - Free, open music streaming
 * Docs: https://docs.audius.co
 */

const AUDIUS_NODES = [
  "https://discoveryprovider.audius.co",
  "https://audius-discovery-2.altego.net",
  "https://audius-discovery-3.altego.net",
];

const MOOD_TO_QUERY = {
  happy: "Bollywood happy upbeat",
  sad: "Bollywood sad emotional",
  surprised: "Bollywood energetic exciting",
  neutral: "Bollywood chill romantic",
};

async function fetchFromNode(nodeUrl, path) {
  const res = await fetch(`${nodeUrl}${path}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Audius ${res.status}`);
  return res.json();
}

async function searchTracks(query, limit = 20) {
  const encoded = encodeURIComponent(query);
  const path = `/v1/tracks/search?query=${encoded}&limit=${limit}`;

  for (const node of AUDIUS_NODES) {
    try {
      const data = await fetchFromNode(node, path);
      if (Array.isArray(data) && data.length > 0) return { data, node };
      if (data?.data?.length > 0) return { data: data.data, node };
    } catch (e) {
      continue;
    }
  }
  return { data: [], node: null };
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getStreamUrl(track, nodeUrl) {
  if (track.stream_url && track.stream_url.startsWith("http")) {
    return track.stream_url;
  }
  if (track.stream_url && track.stream_url.startsWith("/") && nodeUrl) {
    return `${nodeUrl}${track.stream_url}`;
  }
  if (track.id && nodeUrl) {
    return `${nodeUrl}/v1/tracks/${track.id}/stream`;
  }
  return null;
}

function getArtworkUrl(track) {
  const artwork = track.artwork;
  if (!artwork) return null;
  if (typeof artwork === "string") return artwork;
  if (artwork["480x480"]) return artwork["480x480"];
  if (artwork["150x150"]) return artwork["150x150"];
  if (artwork._480x480) return artwork._480x480;
  if (artwork._150x150) return artwork._150x150;
  return null;
}

/**
 * Get a random song for the given mood from Audius
 * @param {string} mood - happy | sad | surprised | neutral
 * @returns {{ url: string, posterUrl: string, title: string, mood: string } | null}
 */
async function getSongByMood(mood) {
  const query = MOOD_TO_QUERY[mood] || MOOD_TO_QUERY.neutral;
  const { data: tracks, node } = await searchTracks(query, 30);

  const validTracks = tracks.filter((t) => {
    const streamUrl = getStreamUrl(t, node);
    return streamUrl && t.title;
  });

  if (validTracks.length === 0) return null;

  const track = pickRandom(validTracks);
  const url = getStreamUrl(track, node);
  const posterUrl = getArtworkUrl(track) || "";

  return {
    url,
    posterUrl: posterUrl || "https://placehold.co/480x480/1f2937/9ca3af?text=♫",
    title: track.title,
    mood,
    artist: track.user?.name,
  };
}

module.exports = { getSongByMood, searchTracks };
