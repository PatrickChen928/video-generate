import { AspectRatio } from "@/components/ui/aspect-ratio";

interface VideoContentProps {
  url: string;
}

export default function VideoContent({
  url
}: VideoContentProps) {
  return (
    <div className="flex items-center justify-center max-w-full w-[420px] min-h-60 flex-shrink-0 bg-mosaic rounded-md overflow-hidden">
      {
        !!url && (
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <video controls className="w-full h-full object-cover" src={url} autoPlay loop />
          </AspectRatio>
        )
      }
    </div>
  )
}
