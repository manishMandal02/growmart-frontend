import React from 'react';

import classes from './MainBody.module.scss';

import ProductsList from '../../Components/MainBody/ProducsList/ProductsList';
import Sidebar from '../../Components/MainBody/Sidebar/Sidebar';

const MainBody = () => {
  return (
    <div className={classes.MainBodyContainer}>
      <Sidebar />
      <ProductsList />
    </div>
  );
};

export default MainBody;
