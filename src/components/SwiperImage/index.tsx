import "swiper/css";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface SwiperImageProps {
  images: File[] | string[];
  className?: string;
}

const SwiperImage: React.FC<SwiperImageProps> = ({ images, className }) => {
  return (
    <div className={`relative mt-3 w-full overflow-hidden ${className || ""}`}>
      <Swiper
        modules={[FreeMode]}
        spaceBetween={8}
        slidesPerView="auto"
        freeMode
        grabCursor
        className="w-full"
      >
        {images.map((item, i) => {
          const url =
            typeof item === "string" ? item : URL.createObjectURL(item);

          return (
            <SwiperSlide key={i} className="!w-[210px] overflow-hidden">
              <div className="rounded-lg overflow-hidden h-[280px] w-[210px]">
                <img src={url} className="w-full h-full object-cover" />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SwiperImage;
