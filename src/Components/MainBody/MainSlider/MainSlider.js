import React from 'react';

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import classes from './MainSlider.module.scss';
import Slide from './Silde/Slide';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

// var swiper = new Swiper('.swiper-container', {
//   pagination: {
//     el: '.swiper-pagination',
//     dynamicBullets: true,
//   },
// });

const MainSlider = () => {
  return (
    <div className={classes.MainSlider}>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        navigation={{
          prevEl: '.prev',
          nextEl: '.next',
        }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
      >
        <SwiperSlide>
          <Slide />
        </SwiperSlide>
        <SwiperSlide>
          <Slide />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MainSlider;
