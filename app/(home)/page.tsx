"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import BlockContainer from "./components/BlockContainer"
import VideoUpload from "./components/VideoUpload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ItemSwitch from "./components/ItemSwitch";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import VideoContent from "./components/VideoContent";

export default function Home() {
  const [file, setFile] = useState<File | undefined>();
  const [topic, setTopic] = useState("");
  const [script, setScript] = useState("");

  const videoLink = useMemo(() => {
    if (!file) return "";
    return URL.createObjectURL(file);
  }, [file])

  const avatars = [
    {
      label: "female",
      value: "female"
    },
    {
      label: "male",
      value: "male"
    }
  ]

  const generateScript = () => {
    setScript("This is a generated script: " + topic);
  }

  return (
    <main className="max-w-screen-lg p-4 mx-auto pt-10">
      <h1 className="text-center text-2xl md:text-6xl font-semibold">
        A UGC video costs <b className="text-primary-500 font-semibold">$100</b>.
        <br />
        Get one for <b className="text-primary-500 font-semibold">$1</b>.
      </h1>
      <p className="mt-8 max-w-2xl mx-auto text-xl md:text-3xl text-center text-muted-foreground">Choose your product video as background, provide a topic and let our AI do the rest. </p>
      <div className="flex flex-col md:flex-row mt-10 md:mt-20 gap-4">
        <VideoContent url={videoLink} />
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
            <ItemSwitch disabled={!file} label="Avatar" options={avatars} />
            <ItemSwitch disabled={!file} className="mt-4" label="Voice" options={avatars} />
            <ItemSwitch disabled={!file} className="mt-4" label="Captions" options={avatars} />
            <ItemSwitch disabled={!file} className="mt-4" label="Music" options={avatars} />
            <Button className="w-full mt-4 bg-primary-500 hover:bg-primary-500/80" disabled={!file}>Generate video</Button>
          </BlockContainer>
        </div>
      </div>
    </main>
  );
}
