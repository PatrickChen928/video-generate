import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface BlockContainerProps {
  className?: string;
  children: React.ReactNode;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
}

export default function BlockContainer({
  children,
  className,
  onDragOver,
  onDragLeave,
  onDrop
}: BlockContainerProps) {
  return (
    <div
      className={cn(
        "rounded-xl shadow-form bg-white px-4 py-4 md:px-4 md:py-8 border",
        className
      )}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {children}
    </div>
  )
}