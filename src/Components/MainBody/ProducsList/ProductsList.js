import { useLocation } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { Alert, AlertTitle, Pagination } from '@material-ui/lab';
import { v4 as uuidv4 } from 'uuid';

import { useWindowSize } from '../../../Hooks/useWindowSize/useWindowSize';

import classes from './ProductsList.module.scss';
import ProductCard from './ProductCard/ProductCard.js';

const ProductsList = ({
  products,
  sortBy,
  sortByChange,
  pages,
  pageChange,
}) => {
  //initialize
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);

  const keyword = urlParams.has('search') ? urlParams.get('search') : '';
  const priceFilter = urlParams.has('price')
    ? urlParams.get('price').toString().split('to')
    : '';
  const pageNumber = urlParams.has('page') ? Number(urlParams.get('page')) : 1;

  const [width] = useWindowSize();
  return (
    <div className={classes.MainContainer}>
      <div className={classes.SortByWrapper}>
        <form action='/action_page.php'>
          {width > 900 && <label htmlFor='cars'>Sort By:</label>}
          <select
            value={sortBy}
            onChange={(e) => {
              sortByChange(e.target.value);
            }}
          >
            <option value='latest'>Sort: by newest</option>
            <option value='rating'>Sort: by rating</option>
            <option value='priceLow'>Sort: by price: low to high</option>
            <option value='priceHigh'>Sort: by price: high to low</option>
          </select>
        </form>
      </div>
      <div
        className={classes.MainGrid}
        classes={{
          root: classes.Grid,
        }}
      >
        {products.length >= 1 ? (
          products.map((prod) => (
            <div className={classes.ProductContainer} key={uuidv4()}>
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
            </div>
          ))
        ) : (
          <div className={classes.MessageContainer}>
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
          </div>
        )}
      </div>

      <div className={classes.PaginationWrapper}>
        <Pagination
          count={pages}
          page={pageNumber}
          onChange={(e, value) => {
            pageChange(value);
          }}
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
