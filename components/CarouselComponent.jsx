"use client"

import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { useCallback } from "react"

export function CarouselComponent({ slides, options, imgWidth, imgHeight, imgAlt }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((src, index) => (
            <div key={index} className="flex-[0_0_100%]">
              <Image src={src} alt={imgAlt} width={imgWidth} height={imgHeight} className="rounded-lg" />
            </div>
          ))}
        </div>
      </div>
      {/* Navigation Buttons */}
      <button onClick={scrollPrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
        ◀
      </button>
      <button onClick={scrollNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
        ▶
      </button>
    </div>
  )
}
