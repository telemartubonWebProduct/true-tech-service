'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export interface SlideData {
  id: string | number;
  desktopImage: string;
  mobileImage?: string;
  alt: string;
}

interface CarouselProps {
  data: SlideData[];
}

const Carousel = ({ data }: CarouselProps) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
        className="w-full"
        a11y={{
          prevSlideMessage: 'สไลด์ก่อนหน้า',
          nextSlideMessage: 'สไลด์ถัดไป',
        }}
      >
        {data.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full">
              <picture>
                {slide.mobileImage && (
                  <source
                    media="(max-width: 768px)"
                    srcSet={slide.mobileImage}
                  />
                )}
                <img
                  src={slide.desktopImage}
                  alt={slide.alt || 'Promotion package'}
                  width={1440}
                  height={600}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  className="w-full object-cover"
                  style={{ aspectRatio: '16/5', maxHeight: '600px' }}
                />
              </picture>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;