import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Slider from '@material-ui/core/Slider';
import debounce from 'lodash/debounce';
import { v4 as uuidv4 } from 'uuid';

import classes from './FilterByPrice.module.scss';

const FilterByPrice = ({ priceFilterChange }) => {
  //initialize
  const location = useLocation();
  const history = useHistory();

  const urlParams = new URLSearchParams(location.search);
  // const paramsPrice = urlParams.has('price')
  //   ? urlParams.get('price').toString().split('to')
  //   : '';
  const keyword = urlParams.get('search');
  //state
  // const [priceFilter, setPriceFilter] = useState(
  //   Number(paramsPrice[1])
  //     ? [Number(paramsPrice[0]), Number(paramsPrice[1])]
  //     : [0, 10]
  // );

  const [priceFilter, setPriceFilter] = useState([0, 10]);

  useEffect(() => {
    if (keyword) {
      setPriceFilter([0, 10]);
    }
  }, [keyword]);

  //handel on filter clickl
  const filterHandler = () => {
    priceFilterChange(priceFilter[0], priceFilter[1]);

    urlParams.set('price', `${priceFilter[0]}to${priceFilter[1]}`);
    urlParams.set('sortBy', `latest`);

    history.push({
      search: urlParams.toString(),
    });
  };

  return (
    <div className={classes.FilterByPrice}>
      <Slider
        key={uuidv4()}
        classes={{
          root: classes.Root,
          thumb: classes.Thumb,
          valueLabel: classes.ValueLable,
          track: classes.Track,
          rail: classes.Rail,
        }}
        valueLabelDisplay='auto'
        max={10}
        min={0}
        defaultValue={[priceFilter[0], priceFilter[1]]}
        onChange={debounce(
          (event, value) => setPriceFilter([value[0], value[1]]),
          250
        )}
      />

      <div className={classes.Wrapper}>
        <div className={classes.PriceView}>
          <input type='text' readOnly value={`$${priceFilter[0]}`} />
          <p>to</p>
          <input
            type='text'
            readOnly
            value={
              priceFilter[1] >= 10
                ? `$${priceFilter[1]}+`
                : `$${priceFilter[1]}`
            }
          />
        </div>
        <button onClick={() => filterHandler()}>Filter</button>
      </div>
    </div>
  );
};

export default FilterByPrice;
