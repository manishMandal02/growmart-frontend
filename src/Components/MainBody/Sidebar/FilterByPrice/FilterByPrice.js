import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Slider from '@material-ui/core/Slider';
import debounce from 'lodash/debounce';

import classes from './FilterByPrice.module.scss';
import { getProductsList } from '../../../../Store/Actions/ProductsActions/ProductActions';
import { Pages } from '@material-ui/icons';

const FilterByPrice = () => {
  //initialize
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();

  const prices = params.price ? params.price.split('-') : '';
  //state
  const [priceFilter, setPriceFilter] = useState(
    prices ? [prices[0], prices[1]] : [0, 25]
  );

  const keyword = params.keyword || '';
  const pageNumber = params.pageNumber || 1;
  const pageSize = 16;

  //handel pagechange
  const handelPageChange = () => {
    const priceFilterUrl = keyword
      ? `/search/${keyword}/price/${priceFilter[0]}-${priceFilter[1]}`
      : `/price/${priceFilter[0]}-${priceFilter[1]}`;
    history.push(priceFilterUrl);
    dispatch(
      getProductsList(keyword, pageNumber, pageSize, 'latest', priceFilter)
    );
  };
  return (
    <div className={classes.FilterByPrice}>
      <Slider
        classes={{
          root: classes.Root,
          thumb: classes.Thumb,
          active: {},
          valueLabel: classes.ValueLable,
          track: classes.Track,
          rail: classes.Rail,
        }}
        valueLabelDisplay='auto'
        max={25}
        min={1}
        defaultValue={[priceFilter[0], priceFilter[1]]}
        onChange={debounce(
          (event, value) => setPriceFilter([value[0], value[1]]),
          250
        )}
      />
      <div className={classes.Wrapper}>
        <div className={classes.PriceView}>
          <input type='text' value={`$${priceFilter[0]}`} />
          <p>to</p>
          <input type='text' value={`$${priceFilter[1]}`} />
        </div>
        <button onClick={() => handelPageChange()}>Filter</button>
      </div>
    </div>
  );
};

export default FilterByPrice;
