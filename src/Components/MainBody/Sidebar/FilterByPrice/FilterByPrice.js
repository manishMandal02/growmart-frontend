import React from 'react';
import Slider from '@material-ui/core/Slider';

import classes from './FilterByPrice.module.scss';

const FilterByPrice = () => {
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
        defaultValue={[0, 60]}
      />
      <div className={classes.Wrapper}>
        <p>{`Price: $${1} - $${90}`}</p>
        <button>Filter</button>
      </div>
    </div>
  );
};

export default FilterByPrice;
