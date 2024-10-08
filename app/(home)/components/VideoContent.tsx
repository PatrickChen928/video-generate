import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface VideoContentProps {
  url: string;
  avatar: string;
  caption: string;
  music: string;
  voice: string;
}

export default function VideoContent({
  url,
  avatar,
  caption,
  music,
}: VideoContentProps) {

  const audioRef = useRef<HTMLAudioElement>(null);
  const voiceRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (url && !playing) {
      audioRef.current?.play();
      voiceRef.current?.play();
      videoRef.current?.play();
      setPlaying(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  const handlePlay = () => {
    if (playing) {
      audioRef.current?.pause();
      voiceRef.current?.pause();
      videoRef.current?.pause();
    } else {
      audioRef.current?.play();
      voiceRef.current?.play();
      videoRef.current?.play();
    }
    setPlaying(!playing)
  }

  return (
    <div className="relative flex items-center justify-center max-w-full w-[480px] min-h-60 flex-shrink-0 bg-mosaic rounded-md overflow-hidden cursor-pointer" onClick={handlePlay}>
      {
        !!url && (
          <>
            <AspectRatio ratio={9 / 16} className="bg-muted">
              <video
                ref={videoRef}
                src={url}
                autoPlay
                loop
                className="w-full h-full object-cover"
              />
            </AspectRatio>
            <audio
              ref={audioRef}
              src={`/assets/musics/${music}.mp3`}
              loop
              autoPlay={playing}
              className="hidden"
            ></audio>
            <Image
              src={`/assets/avatars/${avatar}.png`}
              width={420}
              height={1000}
              alt="avatar"
              className="absolute bottom-0 right-0 w-full h-full"
            />
            <Image
              src={`/assets/captions/${caption}.png`}
              width={420}
              height={100}
              alt="avatar"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-1"
            />
            {
              !playing && (
                <div className="absolute right-4 top-4 p-4 bg-primary-500 rounded-full text-white">
                  <Play size={24} />
                </div>
              )
            }
          </>
        )
      }
    </div>
  )
}
