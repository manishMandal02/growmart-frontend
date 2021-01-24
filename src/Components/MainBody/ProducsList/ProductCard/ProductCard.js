import React from 'react';

import { LocalMallOutlined, FavoriteBorderOutlined } from '@material-ui/icons';
import {} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import classes from './ProductCard.module.scss';

const ProductCard = (props) => {
  return (
    <div className={classes.ProductCard}>
      <div
        className={classes.CardTopContainer}
        style={{
          backgroundImage: `url(${props.img})`,
        }}
      >
        <div className={classes.CardTopWrapper}>
          <div className={classes.CardTop}>
            {/* <div className={classes.OffTagIcon}></div> */}
            <div className={classes.AddToCardIcon}>
              <LocalMallOutlined />
            </div>
          </div>
          <div className={classes.QuickView}>
            <button>Quick View</button>
          </div>
        </div>
      </div>

      <div className={classes.CardBottom}>
        <div className={classes.Top}>
          <div className={classes.Categories}>
            <p>{'#Fruits'}</p>
            <p>{'#Cooking'}</p>
            <p>{'#Vegetable'}</p>
          </div>
          <div className={classes.LikeIcon}>
            <FavoriteBorderOutlined />
          </div>
        </div>
        <div>
          <div className={classes.Info}>
            <p className={classes.Title}>{props.title}</p>
            <div>
              <Rating
                name='read-only'
                size='small'
                value={props.rating}
                readOnly
              />
            </div>
            <p className={classes.Price}>{`$${props.price}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
