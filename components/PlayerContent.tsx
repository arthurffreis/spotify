import { useEffect, useRef, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import Slider from "./Slider";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { Song } from "@/types";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
  volume: number;
  onVolumeChange: (value: number) => void;
  onPlayNext: () => void;
  onPlayPrevious: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
  song,
  songUrl,
  volume,
  onVolumeChange,
  onPlayNext,
  onPlayPrevious,
  isPlaying,
  onTogglePlay,
  onToggleMute
}) => {
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setIsSongPlaying(isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;

      // Verifica se a música chegou ao fim
      if (audio.currentTime === audio.duration && isSongPlaying) {
        onPlayNext();
      }

      if (isSongPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isSongPlaying, volume, onPlayNext]);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const handlePlay = () => {
    onTogglePlay();
  };

  const handleVolumeChange = (value: number) => {
    onVolumeChange(value);
  };

  const toggleMute = () => {
    onToggleMute();
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
        <div
          onClick={handlePlay}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon onClick={toggleMute} className="cursor-pointer" size={34} />
          <Slider value={volume} onChange={handleVolumeChange} />
        </div>
      </div>

      <audio ref={audioRef} id="audio-player" src={songUrl} />
    </div>
  );
};

export default PlayerContent;
