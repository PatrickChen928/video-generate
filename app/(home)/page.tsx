"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import BlockContainer from "./components/BlockContainer"
import VideoUpload from "./components/VideoUpload";
import ItemSwitch from "./components/ItemSwitch";
import VideoContent from "./components/VideoContent";
import assets from "@/lib/video-assets.json"
import { insertVideo } from "@/lib/supabase/video";
import { LoaderCircle } from "lucide-react";

export default function Home() {
  const { avatars = [], captions = [], musics = [], voices = [] } = assets;

  const [file, setFile] = useState<File | undefined>();
  const [topic, setTopic] = useState("");
  const [script, setScript] = useState("");
  const [avatarValue, setAvatarValue] = useState(avatars[0]);
  const [captionValue, setCaptionValue] = useState(captions[0]);
  const [musicValue, setMusicValue] = useState(musics[0]);
  const [voiceValue, setVoiceValue] = useState(voices[0]);

  const [transition, startTransition] = useTransition()

  const videoLink = useMemo(() => {
    if (!file) return "";
    return URL.createObjectURL(file);
  }, [file])

  const generateScript = () => {
    setScript("This is a generated script: " + topic);
  }

  const generateVideo = () => {
    startTransition(() => insertVideo({
      topic,
      script,
      avatar: avatarValue,
      voice: voiceValue,
      captions: captionValue,
      music: musicValue
    }).then(() => {
      toast.success("Video generated successfully!")
    }).catch(() => {
      toast.error("Uh oh! Something went wrong.")
    }))
  }

  return (
    <main className="max-w-screen-lg p-4 mx-auto pt-10">
      <h1 className="text-center text-2xl md:text-6xl font-semibold">
        A UGC video costs <b className="text-primary-500 font-semibold">$100</b>.
        <br />
        Get one for <b className="text-primary-500 font-semibold">$1</b>.
      </h1>
      <p className="mt-8 max-w-2xl mx-auto md:text-3xl text-center text-muted-foreground">Choose your product video as background, provide a topic and let our AI do the rest. </p>
      <div className="flex flex-col md:flex-row mt-10 md:mt-20 gap-4">
        <VideoContent
          url={videoLink}
          avatar={avatarValue}
          caption={captionValue}
          music={musicValue}
          voice={voiceValue}
        />
        <div className="flex-1 overflow-hidden">
          <VideoUpload onChange={(file) => setFile(file)} />
          <BlockContainer className="mt-8">
            <h2 className="text-xl font-semibold">Script</h2>
            <div className="flex gap-2 mt-4">
              <Input placeholder="Topic of the script" disabled={!file} className="flex-1" onChange={(e) => setTopic(e.target.value)} />
              <Button className="flex-shrink-0" disabled={!file} variant="outline" onClick={generateScript}>Generate script</Button>
            </div>
            <Textarea
              className="mt-2 resize-none h-48"
              placeholder="Script for the video"
              value={script}
              disabled={!file}
              onChange={(e) => setScript(e.target.value)}
            />
          </BlockContainer>
          <BlockContainer className="mt-8">
            <ItemSwitch
              disabled={!file}
              label="Avatar"
              options={avatars.map((name) => ({ value: name, label: name }))}
              onChange={(value) => setAvatarValue(value)}
            />
            <ItemSwitch
              disabled={!file}
              className="mt-4"
              label="Voice"
              options={voices.map((name) => ({ value: name, label: name }))}
              onChange={(value) => setVoiceValue(value)}
            />
            <ItemSwitch
              disabled={!file}
              className="mt-4"
              label="Captions"
              options={captions.map((name) => ({ value: name, label: name + ' style' }))}
              onChange={(value) => setCaptionValue(value)}
            />
            <ItemSwitch
              disabled={!file}
              className="mt-4"
              label="Music"
              options={[{ value: '', label: 'None' }, ...musics.map((name) => ({ value: name, label: name }))]}
              onChange={(value) => setMusicValue(value)}
            />
            <Button
              className="flex gap-2 items-center w-full mt-4 bg-primary-500 hover:bg-primary-500/80"
              disabled={!file || transition}
              onClick={generateVideo}
            >
              {transition && <LoaderCircle className="animate-spin" size={24} />}
              Generate video
            </Button>
          </BlockContainer>
        </div>
      </div>
    </main>
  );
}
