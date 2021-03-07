import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useWindowSize } from '../../Hooks/useWindowSize/useWindowSize';

import classes from './MainBody.module.scss';

import ProductsList from '../../Components/MainBody/ProducsList/ProductsList';
import Sidebar from '../../Components/MainBody/Sidebar/Sidebar';
import MainSlider from '../../Components/MainBody/MainSlider/MainSlider';
import TopProductsSlider from '../../Components/MainBody/TopProductsSlider/TopProductsSlider';
import {
  getProductsByBrand,
  getProductsByCategory,
  getProductsList,
} from '../../Store/Actions/ProductsActions/ProductActions';

const MainBody = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const urlParams = new URLSearchParams(location.search);

  const keyword = urlParams.has('search') ? urlParams.get('search') : '';
  // const priceFilter = urlParams.has('price')
  //   ? urlParams.get('price').toString().split('to')
  //   : '';
  const pageNumber = urlParams.has('page') ? urlParams.get('page') : '';
  const sortByParams = urlParams.has('sortBy') ? urlParams.get('sortBy') : '';

  const [width] = useWindowSize();

  //state
  const [sortBy, setSortBy] = useState('latest');
  const [priceFilterRange, setPriceFilterRange] = useState([]);

  const category = params.category || '';
  const brand = params.brand || '';
  const pageSize = 16;

  const productsList = useSelector((state) => state.product.productsList);
  const { loading, products, error, pages } = productsList;

  useEffect(() => {
    if (sortByParams) {
      setSortBy(sortByParams);
    }
    if (category) {
      dispatch(
        getProductsByCategory(
          category,
          pageNumber,
          pageSize,
          sortBy,
          priceFilterRange
        )
      );
    } else if (brand) {
      dispatch(
        getProductsByBrand(
          brand,
          pageNumber,
          pageSize,
          sortBy,
          priceFilterRange
        )
      );
    } else {
      dispatch(
        getProductsList(keyword, pageNumber, pageSize, sortBy, priceFilterRange)
      );
    }
    //scroll to top on render
    const scrollToTop = () => {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox
    };
    scrollToTop();
  }, [
    dispatch,
    pageNumber,
    sortByParams,
    pageSize,
    keyword,
    sortBy,
    category,
    brand,
    priceFilterRange,
  ]);

  //handel pagechange
  const handelPageChange = (value) => {
    history.push({
      search: urlParams.toString(),
    });
  };

  return (
    <div className={classes.MainBodyContainer}>
      <Helmet>
        <title>
          {category
            ? `${category} | GrowMart`
            : brand
            ? `${brand} | GrowMart`
            : keyword
            ? `${keyword} - Search | GrowMart`
            : `Fresh Groceries Online at Best Prices | GrowMart`}
        </title>
      </Helmet>
      {location.pathname === '/' ? <MainSlider /> : null}
      <div className={classes.MainBodyWrapper}>
        {width > 770 && (
          <>
            <Sidebar
              priceFilterChange={(p1, p2) => setPriceFilterRange([p1, p2])}
            />
          </>
        )}
        <ProductsList
          products={products}
          pages={pages}
          sortBy={sortBy}
          sortByChange={(sort) => {
            setSortBy(sort);
            urlParams.set('sortBy', sort);
            history.push({
              search: urlParams.toString(),
            });
          }}
          error={error}
          loading={loading}
          pageChange={(value) => {
            handelPageChange(value);
            urlParams.set('page', value);
            history.push({
              search: urlParams.toString(),
            });
          }}
        />
      </div>
      <TopProductsSlider />
    </div>
  );
};

export default MainBody;
