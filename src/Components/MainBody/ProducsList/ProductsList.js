import React from 'react';

import { Grid } from '@material-ui/core';

import classes from './ProductsList.module.scss';
import ProductCard from './ProductCard/ProductCard.js';

const ProductsList = () => {
  return (
    <div className={classes.MainContainer}>
      <div className={classes.SortByWrapper}>
        <p>Sort By:</p>
      </div>
      <Grid container spacing={3} justify='start' alignItems='center'>
        <Grid item>
          <ProductCard
            img={
              'https://www.portotheme.com/wordpress/porto/shop35/wp-content/uploads/sites/178/2020/07/602180-300x300.jpg'
            }
            title={'Sample Product1'}
            price={'$29.00'}
          />
        </Grid>
        <Grid item>
          <ProductCard
            img={
              'https://www.portotheme.com/wordpress/porto/shop35/wp-content/uploads/sites/178/2020/07/602180-300x300.jpg'
            }
            title={'Sample Product1'}
            price={'$29.00'}
          />
        </Grid>
        <Grid item>
          <ProductCard
            img={
              'https://www.portotheme.com/wordpress/porto/shop35/wp-content/uploads/sites/178/2020/07/602180-300x300.jpg'
            }
            title={'Sample Product1'}
            price={'$29.00'}
          />
        </Grid>
        <Grid item>
          <ProductCard
            img={
              'https://www.portotheme.com/wordpress/porto/shop35/wp-content/uploads/sites/178/2020/07/602180-300x300.jpg'
            }
            title={'Sample Product1'}
            price={'$29.00'}
          />
        </Grid>
        <Grid item>
          <ProductCard
            img={
              'https://www.portotheme.com/wordpress/porto/shop35/wp-content/uploads/sites/178/2020/07/602180-300x300.jpg'
            }
            title={'Sample Product1'}
            price={'$29.00'}
          />
        </Grid>
        <Grid item>
          <ProductCard
            img={
              'https://www.portotheme.com/wordpress/porto/shop35/wp-content/uploads/sites/178/2020/07/602180-300x300.jpg'
            }
            title={'Sample Product1'}
            price={'$29.00'}
          />
        </Grid>
      </Grid>
      <div className={classes.PaginationWrapper}></div>
    </div>
  );
};

export default ProductsList;
