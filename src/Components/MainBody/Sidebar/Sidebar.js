import React from 'react';
import { Link } from 'react-router-dom';

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

const Sidebar = () => {
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
          >
            {/* Filter By Price */}
            <Typography component='div'>
              <Box fontWeight={600} fontSize={20} m={1}>
                Filter By Price
              </Box>
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.FilterByPrice}>
            <FilterByPrice />
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
                Brand
              </Box>
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.Categories}>
            <ul>
              <Link to='/brand/growmart'>GrowMart</Link>
              <Link to='/brand/marketside'>MarketSide</Link>
              <Link to='/brand/nestle'>Nestle</Link>
              <Link to='/brand/parle'>Parle</Link>
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
                Categories
              </Box>
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.Categories}>
            <ul>
              <Link to={`/category/vegetables`}>Vegetables</Link>
              <Link to={`/category/fruits`}>Fruits</Link>
              <Link to={`/category/leafyvegetables`}>Leafy Vegetables</Link>
              <Link to={`/category/freshprepared`}>Fresh Prepared</Link>
            </ul>
          </AccordionDetails>
        </Accordion>
      </div>

      <div>
        <Typography component='div'>
          <Box fontWeight={600} fontSize={20} m={1} marginLeft={2}>
            Popular Products
          </Box>
        </Typography>
        <div className={classes.RecentlyAdded}>
          <SidebarProductsCard />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
