import React from 'react';

import { Rating } from '@material-ui/lab';

import classes from './ProdcutPage.module.scss';
import {
  LocalMallOutlined,
  FavoriteBorder,
  LinkedIn,
  Twitter,
  Facebook,
  Instagram,
} from '@material-ui/icons';

const ProdcutPage = (props) => {
  return (
    <div className={classes.ProdcutPage}>
      <div className={classes.Container}>
        <div className={classes.ImageWrapper}>
          <img src={props.image} alt={`${props.title}`} />
          <span>
            <img src={props.image} alt={`${props.title} overview`} />
          </span>
        </div>

        <div className={classes.ProdcutInfo}>
          <p>{props.title}</p>
          <p>
            Brand:<a href={'/#'}>{props.brand}</a>
          </p>
          <div className={classes.Rating}>
            <Rating
              name='read-only'
              size='medium'
              value={props.rating}
              readOnly
            />
          </div>
          <div className={classes.Price}>
            <p>$</p>
            <div>{props.price}</div>
          </div>
          <p>{props.description}</p>
          <p>
            Categories:
            <span>
              <a href={'/#'}>{`#${'BreakFast'}`}</a>{' '}
              <a href={'/#'}>{`#${'Cooking'}`}</a>
            </span>
          </p>
          <div className={classes.ButtonWrapper}>
            <button>
              <LocalMallOutlined /> Add To Cart
            </button>
            <button>
              <FavoriteBorder /> Add To Wishlist
            </button>
          </div>

          <div className={classes.SocialIconContainer}>
            <span>
              Share:
              {/* <Share /> */}
            </span>
            <a href='/#'>
              <Twitter />
            </a>
            <a href='/#'>
              <Facebook />
            </a>
            <a href='/#'>
              <Instagram />
            </a>
            <a href='/#'>
              <LinkedIn />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdcutPage;
