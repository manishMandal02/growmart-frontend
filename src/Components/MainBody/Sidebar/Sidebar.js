import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { AddOutlined } from '@material-ui/icons';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  makeStyles,
} from '@material-ui/core';

import classes from './Sidebar.module.scss';
import FilterByPrice from './FilterByPrice/FilterByPrice';
import SidebarProductsCard from './SidebarProductsCard/SidebarProductCard';

const useStyles = makeStyles({
  content: {
    margin: '6px 2px 12px -2px  !important',
  },
  expanded: {},
});

const Sidebar = ({ priceFilterChange }) => {
  const mclass = useStyles();
  return (
    <div className={classes.Sidebar}>
      <div>
        <Accordion square defaultExpanded>
          <AccordionSummary
            className={classes.AccordionSummary}
            classes={{
              content: mclass.content,
              expanded: mclass.expanded,
            }}
            expandIcon={<AddOutlined />}
            aria-controls='panel1a-content'
            id='panel1a-header'
            style={{
              borderBottom: '1px solid #d4d4d4',
            }}
          >
            {/* Filter By Price */}
            <Typography component='div'>
              <Box fontWeight={600} fontSize={20} m={1}>
                FILTER BY PRICE
              </Box>
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.FilterByPrice}>
            <FilterByPrice
              priceFilterChange={(p1, p2) => priceFilterChange(p1, p2)}
            />
          </AccordionDetails>
        </Accordion>
      </div>

      <div>
        <Accordion square defaultExpanded>
          <AccordionSummary
            className={classes.AccordionSummary}
            classes={{
              content: mclass.content,
              expanded: mclass.expanded,
            }}
            expandIcon={<AddOutlined />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography component='div'>
              <Box fontWeight={600} fontSize={20} m={1}>
                BRAND
              </Box>
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.Categories}>
            <ul key={uuidv4()}>
              <Link key={uuidv4()} to='/brand/growmart'>
                GrowMart
              </Link>
              <Link key={uuidv4()} to='/brand/marketside'>
                MarketSide
              </Link>
              <Link key={uuidv4()} to='/brand/nestle'>
                Nestle
              </Link>
              <Link key={uuidv4()} to='/brand/parle'>
                Parle
              </Link>
            </ul>
          </AccordionDetails>
        </Accordion>
      </div>

      <div>
        <Accordion square>
          <AccordionSummary
            className={classes.AccordionSummary}
            classes={{
              content: mclass.content,
              expanded: mclass.expanded,
            }}
            expandIcon={<AddOutlined />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography component='div'>
              <Box fontWeight={600} fontSize={20} m={1}>
                CATEGORY
              </Box>
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.Categories}>
            <ul key={uuidv4()}>
              <Link key={uuidv4()} to={`/category/vegetables`}>
                Vegetables
              </Link>
              <Link key={uuidv4()} to={`/category/fruits`}>
                Fruits
              </Link>
              <Link key={uuidv4()} to={`/category/leafyvegetables`}>
                Leafy Vegetables
              </Link>
              <Link key={uuidv4()} to={`/category/freshprepared`}>
                Fresh Prepared
              </Link>
            </ul>
          </AccordionDetails>
        </Accordion>
      </div>

      <div>
        <Accordion square defaultExpanded>
          <AccordionSummary
            className={classes.AccordionSummary}
            classes={{
              content: mclass.content,
              expanded: mclass.expanded,
            }}
            aria-controls='panel1a-content'
            id='panel1a-header'
            style={{ borderBottom: '1px solid #d4d4d4' }}
          >
            <Typography component='div'>
              <Box fontWeight={600} fontSize={19} m={1}>
                POPULAR PRODUCTS
              </Box>
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{ overflow: 'hidden', padding: '1em .4em .4em .66em' }}
            className={classes.RecentlyAdded}
          >
            <div>
              <SidebarProductsCard />
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Sidebar;
