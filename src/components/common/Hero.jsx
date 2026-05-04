import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import HeroImg1 from "../../assets/images/banner-1.jpg";
import HeroImg2 from "../../assets/images/banner-2.jpg";

const Hero = () => {
  return (
    <section className="section-1">
      {/* Swiper Slider Main */}
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        breakpoints={{
          1024: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        }}
      >
        <SwiperSlide>
          <div
            className="content"
            style={{ backgroundImage: `url(${HeroImg2})` }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="content"
            style={{ backgroundImage: `url(${HeroImg1})` }}
          ></div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Hero;
