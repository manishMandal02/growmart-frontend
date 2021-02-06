import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';
import { Alert, AlertTitle, Pagination } from '@material-ui/lab';

import classes from './ProductsList.module.scss';
import ProductCard from './ProductCard/ProductCard.js';
import * as actionCreators from '../../../Store/Actions/ProductsActions/ProductActions';

const ProductsList = () => {
  const dispatch = useDispatch();

  const productsList = useSelector((state) => state.product.productsList);
  const { loading, products, error } = productsList;

  useEffect(() => {
    dispatch(actionCreators.getProductsList());
  }, [dispatch]);
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
        {loading ? (
          <CircularProgress color='primary'>Loading</CircularProgress>
        ) : error ? (
          <Alert severity='error'>
            <AlertTitle>Error</AlertTitle>
            <strong>{error} </strong>
          </Alert>
        ) : (
          products.map((prod) => (
            <Grid item key='prod._id'>
              <ProductCard
                id={prod._id}
                img={prod.image}
                title={prod.name}
                price={prod.price}
                rating={prod.rating}
              />
            </Grid>
          ))
        )}
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
