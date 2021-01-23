import React from 'react';

import classes from './Slide.module.scss';
import sliderImage1 from '../../../../Assets/Images/slider-image1.jpg';

const Slide = (props) => {
  return (
    <div
      className={classes.Slide}
      style={{
        backgroundImage: `url(${sliderImage1})`,
      }}
    >
      <div className={classes.SlideContent}>
        <p>New Arrival | Exclusive On GrowMart</p>
        <h2>Organic Coffee</h2>
        <h6>
          Special Blend <p>Fresh!</p>
        </h6>
        <h1>
          UP TO <p>50%</p>
        </h1>
      </div>
    </div>
  );
};

export default Slide;
