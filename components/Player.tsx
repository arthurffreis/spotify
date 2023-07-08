"use client"


import { useEffect, useState } from "react";
import PlayerContent from "./PlayerContent";
import usePlayer from "@/hooks/usePlayer";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import useGetSongById from "@/hooks/useGetSongById";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  const songUrl = useLoadSongUrl(song!);

  const onVolumeChange = (value: number) => {
    setVolume(value);
  };

  const onTogglePlay = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const onToggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      <PlayerContent
        song={song}
        songUrl={songUrl}
        volume={volume}
        onVolumeChange={onVolumeChange}
        onPlayNext={onPlayNext}
        onPlayPrevious={onPlayPrevious}
        isPlaying={isPlaying}
        onTogglePlay={onTogglePlay}
        onToggleMute={onToggleMute}
      />
    </div>
  );
};

export default Player;
