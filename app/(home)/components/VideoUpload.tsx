"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import BlockContainer from "./BlockContainer";
import { cn } from "@/lib/utils";

interface VideoUploadProps {
  onChange?: (file?: File) => void;
}

export default function VideoUpload({
  onChange
}: VideoUploadProps) {
  const [fileActive, setFileActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      onChange?.(file);
    }
  }

  const tipContent = useMemo(() => {
    if (fileActive) {
      return "(Drop file to use)";
    }
    if (!file) {
      return "(drag & drop your file here)";
    }
    return file.name;
  }, [file, fileActive])

  const handleDropOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileActive(true);
  }
  const handleDragLeave = () => {
    setFileActive(false);
  }
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFile(file);
      onChange?.(file);
    }
  }

  const handleClear = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onChange?.();
  }

  return (
    <BlockContainer
      className={cn("relative", fileActive && "bg-primary-500/10 border-primary-500")}
      onDragOver={handleDropOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="relative flex items-center h-8">
        <h3 className="text-xl font-semibold">Video</h3>
        <div className="flex-1 ml-4 text-muted-foreground truncate">{tipContent}</div>
        {
          !!file && <Button variant="outline" className="ml-4 flex-shrink-0" onClick={handleClear}>Clear</Button>
        }
      </div>
      <input
        ref={fileInputRef}
        accept="video/*"
        type="file"
        className={cn(
          "opacity-0 absolute left-0 right-0 bottom-0 top-0 cursor-pointer z-2",
          !!file && "hidden"
        )}
        onChange={handleFileChange}
      />
    </BlockContainer>
  )
}
