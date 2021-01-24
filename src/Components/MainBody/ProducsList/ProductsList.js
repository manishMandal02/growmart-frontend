import React from 'react';

import { Grid } from '@material-ui/core';

import { Pagination } from '@material-ui/lab';

import classes from './ProductsList.module.scss';
import ProductCard from './ProductCard/ProductCard.js';

const ProductsList = () => {
  return (
    <div className={classes.MainContainer}>
      <div className={classes.SortByWrapper}>
        <form action='/action_page.php'>
          <label for='cars'>Sort By:</label>
          <select name='sortBy'>
            <option value='volvo'>Sort by latest</option>
            <option value='audi'>Sort by rating</option>
            <option value='saab'>Sort by price: high to low</option>
            <option value='opel'>Sort by price: low to high</option>
          </select>
        </form>
      </div>
      <Grid
        classes={{
          root: classes.Grid,
        }}
        container
        spacing={2}
        justify='start'
        alignItems='center'
      >
        <Grid item>
          <ProductCard
            img={
              'https://www.portotheme.com/wordpress/porto/shop35/wp-content/uploads/sites/178/2020/07/578239-300x300.jpg'
            }
            title={'Sample Product'}
            price={'29.00'}
            rating={'2'}
          />
        </Grid>
        <Grid item>
          <ProductCard
            img={
              'https://www.portotheme.com/wordpress/porto/shop35/wp-content/uploads/sites/178/2020/07/602180-300x300.jpg'
            }
            title={'Sample Product'}
            price={'29.00'}
            rating={'0'}
          />
        </Grid>
        <Grid item>
          <ProductCard
            img={
              'https://www.portotheme.com/wordpress/porto/shop35/wp-content/uploads/sites/178/2020/07/578239-300x300.jpg'
            }
            title={'Sample Product'}
            price={'29.00'}
            rating={'3'}
          />
        </Grid>
        <Grid item>
          <ProductCard
            img={
              'https://www.portotheme.com/wordpress/porto/shop35/wp-content/uploads/sites/178/2020/07/496465-300x300.jpg'
            }
            title={'Sample Product'}
            price={'29.00'}
            rating={'4'}
          />
        </Grid>
        <Grid item>
          <ProductCard
            img={
              'https://www.portotheme.com/wordpress/porto/shop35/wp-content/uploads/sites/178/2020/07/602180-300x300.jpg'
            }
            title={'Sample Product'}
            price={'29.00'}
            rating={'5'}
          />
        </Grid>
        <Grid item>
          <ProductCard
            img={
              'https://www.portotheme.com/wordpress/porto/shop35/wp-content/uploads/sites/178/2020/07/578239-300x300.jpg'
            }
            title={'Sample Product'}
            price={'29.00'}
            rating={'3'}
          />
        </Grid>
        <Grid item>
          <ProductCard
            img={
              'https://www.portotheme.com/wordpress/porto/shop35/wp-content/uploads/sites/178/2020/07/496465-300x300.jpg'
            }
            title={'Sample Product'}
            price={'29.00'}
            rating={'3'}
          />
        </Grid>
        <Grid item>
          <ProductCard
            img={
              'https://www.portotheme.com/wordpress/porto/shop35/wp-content/uploads/sites/178/2020/07/496465-300x300.jpg'
            }
            title={'Sample Product'}
            price={'29.00'}
            rating={'3'}
          />
        </Grid>
        <Grid item>
          <ProductCard
            img={
              'https://www.portotheme.com/wordpress/porto/shop35/wp-content/uploads/sites/178/2020/07/496465-300x300.jpg'
            }
            title={'Sample Product'}
            price={'29.00'}
            rating={'3'}
          />
        </Grid>
        <Grid item>
          <ProductCard
            img={
              'https://www.portotheme.com/wordpress/porto/shop35/wp-content/uploads/sites/178/2020/07/578239-300x300.jpg'
            }
            title={'Sample Product'}
            price={'29.00'}
            rating={'3'}
          />
        </Grid>
        <Grid item>
          <ProductCard
            img={
              'https://www.portotheme.com/wordpress/porto/shop35/wp-content/uploads/sites/178/2020/07/602180-300x300.jpg'
            }
            title={'Sample Product'}
            price={'29.00'}
            rating={'3'}
          />
        </Grid>
        <Grid item>
          <ProductCard
            img={
              'https://www.portotheme.com/wordpress/porto/shop35/wp-content/uploads/sites/178/2020/07/496465-300x300.jpg'
            }
            title={'Sample Product'}
            price={'29.00'}
            rating={'3'}
          />
        </Grid>
      </Grid>

      <div className={classes.PaginationWrapper}>
        <Pagination
          count={3}
          color='primary'
          variant='outlined'
          shape='rounded'
        />
      </div>
    </div>
  );
};

export default ProductsList;
