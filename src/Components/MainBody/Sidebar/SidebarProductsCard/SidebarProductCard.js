import React from 'react';

import { Rating } from '@material-ui/lab';

import classes from './SidebarProductCard.module.scss';

const SidebarProductsCard = (props) => {
  return (
    <div className={classes.ProductCard}>
      <img src={props.img} alt={props.title} />
      <div className={classes.Container}>
        <p>{props.title}</p>
        <Rating name='read-only' size='small' value={props.rating} readOnly />
        <p className={classes.Price}>{`$${props.price}`}</p>
      </div>
    </div>
  );
};

export default SidebarProductsCard;
