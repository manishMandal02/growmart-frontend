import React from 'react';
import { useLocation } from 'react-router-dom';

import classes from './MainBody.module.scss';

import ProductsList from '../../Components/MainBody/ProducsList/ProductsList';
import Sidebar from '../../Components/MainBody/Sidebar/Sidebar';
import MainSlider from '../../Components/MainBody/MainSlider/MainSlider';
import TopProductsSlider from '../../Components/MainBody/TopProductsSlider/TopProductsSlider';

const MainBody = () => {
  const location = useLocation();
  return (
    <div className={classes.MainBodyContainer}>
      {location.pathname === '/' ? <MainSlider /> : null}
      <div className={classes.MainBodyWrapper}>
        <Sidebar />
        <ProductsList />
      </div>
      <TopProductsSlider />
    </div>
  );
};

export default MainBody;
