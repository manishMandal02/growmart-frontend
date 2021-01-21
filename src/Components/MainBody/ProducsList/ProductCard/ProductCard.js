import React from 'react';

import { Paper } from '@material-ui/core';

import classes from './ProductCard.module.scss';

const ProductCard = (props) => {
  return (
    <Paper elevation={1} className={classes.ProductCard}>
      <div
        className={classes.CardTopContainer}
        style={{
          backgroundImage: `url(${props.img})`,
        }}
      >
        <div className={classes.CardTop}>icon</div>
        <div className={classes.QuickView}>
          <button>QuickView</button>
        </div>
      </div>

      <div className={classes.CardBottom}>
        <p>{props.title}</p>
        <p>{props.price}</p>
      </div>
    </Paper>
  );
};

export default ProductCard;
