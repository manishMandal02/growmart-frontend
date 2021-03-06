import React from 'react';
import { v4 as uuidv4 } from 'uuid';
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
        loop
        navigation={{
          prevEl: '.prev',
          nextEl: '.next',
        }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
      >
        <SwiperSlide key={uuidv4()}>
          <Slide key={uuidv4()} />
        </SwiperSlide>
        <SwiperSlide key={uuidv4()}>
          <Slide key={uuidv4()} />
        </SwiperSlide>
        <SwiperSlide key={uuidv4()}>
          <Slide key={uuidv4()} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MainSlider;
