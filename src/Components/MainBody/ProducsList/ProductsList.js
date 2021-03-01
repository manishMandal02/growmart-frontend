import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { CircularProgress, Grid } from '@material-ui/core';
import { Alert, AlertTitle, Pagination } from '@material-ui/lab';

import classes from './ProductsList.module.scss';
import ProductCard from './ProductCard/ProductCard.js';
import * as actionCreators from '../../../Store/Actions/ProductsActions/ProductActions';

const ProductsList = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  // const location = useLocation();

  //state
  const [sortBy, setSortBy] = useState('latest');

  const keyword = params.keyword || '';
  const pageNumber = params.pageNumber || 1;
  const category = params.category || '';
  const brand = params.brand || '';
  const priceFilter = params.price ? params.price.split('-') : '';
  const pageSize = 16;

  // console.log(pageNumber);

  const productsList = useSelector((state) => state.product.productsList);
  const { loading, products, error, pages } = productsList;
  // console.log(page);
  // console.log(pages);

  useEffect(() => {
    if (category) {
      dispatch(
        actionCreators.getProductsByCategory(
          category,
          pageNumber,
          pageSize,
          sortBy
        )
      );
    }

    if (brand) {
      dispatch(
        actionCreators.getProductsByBrand(brand, pageNumber, pageSize, sortBy)
      );
    }
    if (!priceFilter && !category && !brand) {
      dispatch(
        actionCreators.getProductsList(keyword, pageNumber, pageSize, sortBy)
      );
    }
  }, [
    dispatch,
    pageNumber,
    pageSize,
    keyword,
    sortBy,
    priceFilter,
    category,
    brand,
  ]);

  //handel pagechange
  const handelPageChange = (value) => {
    const pageChangeUrl =
      keyword && !priceFilter
        ? `/search/${keyword}/page/${value}`
        : priceFilter && !keyword
        ? `/price/${priceFilter[0]}-${priceFilter[1]}/page/${value}`
        : priceFilter && keyword
        ? `/search/${keyword}/price/${priceFilter[0]}-${priceFilter[1]}/page/${value}`
        : category
        ? `/category/${category}/page/${value}`
        : `page/${value}`;
    history.push(pageChangeUrl);
  };
  return (
    <div className={classes.MainContainer}>
      <div className={classes.SortByWrapper}>
        <form action='/action_page.php'>
          <label for='cars'>Sort By:</label>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
          >
            <option value='latest'>Sort: by newest</option>
            <option value='rating'>Sort: by rating</option>
            <option value='priceLow'>Sort: by price: low to high</option>
            <option value='priceHigh'>Sort: by price: high to low</option>
          </select>
        </form>
      </div>
      <Grid
        classes={{
          root: classes.Grid,
        }}
        container
        spacing={2}
        justify={products && products.length >= 1 ? 'flex-start' : 'center'}
        alignItems='center'
      >
        {loading ? (
          <CircularProgress color='primary'>Loading</CircularProgress>
        ) : error ? (
          <Alert severity='error'>
            <AlertTitle>Error</AlertTitle>
            <strong>{error} </strong>
          </Alert>
        ) : products.length >= 1 ? (
          products.map((prod) => (
            <Grid item key={prod.id}>
              <ProductCard
                id={prod._id}
                img={prod.image}
                title={prod.name}
                price={prod.price}
                category={prod.category}
                description={prod.description}
                rating={prod.rating}
                brand={prod.brand}
                numReviews={prod.numReviews}
              />
            </Grid>
          ))
        ) : (
          <Grid item>
            <Alert severity='info' variant='filled'>
              {keyword && !priceFilter ? (
                <>
                  No Products found for <b>{keyword}</b>
                </>
              ) : priceFilter && !keyword ? (
                <>
                  No Products found for price range {<b>${priceFilter[0]}</b>}{' '}
                  to <b>${priceFilter[1]}</b>
                </>
              ) : priceFilter && keyword ? (
                <>
                  No Products found for <b>{keyword}</b> from price{' '}
                  {<b>${priceFilter[0]}</b>} to <b>${priceFilter[1]}</b>
                </>
              ) : (
                <>No products found</>
              )}
            </Alert>
          </Grid>
        )}
      </Grid>

      <div className={classes.PaginationWrapper}>
        <Pagination
          count={pages}
          page={pageNumber}
          onChange={(e, value) => handelPageChange(value)}
          color='primary'
          variant='outlined'
          shape='rounded'
          size='large'
        />
      </div>
    </div>
  );
};

export default ProductsList;
