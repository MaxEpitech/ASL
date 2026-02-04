'use client';

import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

interface SponsorsSliderProps {
  autoplay?: boolean;
  showControls?: boolean;
}

export function SponsorsSlider({ autoplay = true, showControls = true }: SponsorsSliderProps) {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
    },
    autoplay ? [Autoplay({ delay: 3000, stopOnInteraction: false })] : []
  );

  useEffect(() => {
    // Fetch sponsors
    fetch('/api/sponsors')
      .then((res) => res.json())
      .then((data) => {
        setSponsors(data.sponsors ||[]);
      })
      .catch(console.error);
  }, []);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  if (sponsors.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0 px-4"
            >
              <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow h-40 flex items-center justify-center">
                {sponsor.website ? (
                  <Link
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      fill
                      className="object-contain p-4 grayscale hover:grayscale-0 transition-all"
                    />
                  </Link>
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      {showControls && sponsors.length > 4 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
            aria-label="Suivant"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  );
}
