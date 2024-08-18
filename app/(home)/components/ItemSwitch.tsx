"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils";

interface ItemSwitchProps {
  label: string;
  className?: string;
  disabled?: boolean;
  options: { label: string; value: string }[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export default function ItemSwitch({
  defaultValue,
  label,
  className,
  disabled,
  options,
  onChange
}: ItemSwitchProps) {
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api) {
      return
    }

    if (defaultValue) {
      api.scrollTo(options.findIndex((opt) => opt.value === defaultValue))
    }

    api.on("select", () => {
      const index = api.selectedScrollSnap()
      const value = options[index].value
      onChange?.(value)
    })
  }, [api, defaultValue, options, onChange])

  const handleScrollLeft = () => {
    if (disabled) return
    api?.scrollTo(api.selectedScrollSnap() - 1)
  }

  const handleScrollRight = () => {
    if (disabled) return
    api?.scrollTo(api.selectedScrollSnap() + 1)
  }

  return (
    <div className={cn(
      "flex w-full items-center",
      className
    )}>
      <h2 className="text-xl font-semibold w-28">{label}</h2>
      <div className="flex-1 flex items-center px-1 border rounded-md overflow-hidden">
        <ChevronLeft className={cn(
          "flex-shrink-0 w-6 h-6 text-muted-foreground cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed"
        )} onClick={handleScrollLeft} />
        <Carousel
          setApi={setApi}
          className="flex-1 overflow-hidden"
          opts={{
            loop: true,
            active: !disabled
          }}
        >
          <CarouselContent>
            {options.map((opt) => (
              <CarouselItem key={opt.value}>
                <div className="py-2 text-center truncate">
                  {opt.label}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <ChevronRight className={cn(
          "flex-shrink-0 w-6 h-6 text-muted-foreground cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed"
        )} onClick={handleScrollRight} />
      </div>
    </div>
  )
}
