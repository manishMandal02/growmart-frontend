import React from 'react';

import classes from './MainBody.module.scss';

import ProductsList from '../../Components/MainBody/ProducsList/ProductsList';
import Sidebar from '../../Components/MainBody/Sidebar/Sidebar';
import MainSlider from '../../Components/MainBody/MainSlider/MainSlider';

const MainBody = () => {
  return (
    <div className={classes.MainBodyContainer}>
      <MainSlider />
      <div className={classes.MainBodyWrapper}>
        <Sidebar />
        <ProductsList />
      </div>
    </div>
  );
};

export default MainBody;
