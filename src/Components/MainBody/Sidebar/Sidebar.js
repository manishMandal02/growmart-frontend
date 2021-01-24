import React from 'react';

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
                Categories
              </Box>
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.Categories}>
            <ul>
              <a href='#/'>Categorie1</a>
              <a href='#/'>Categorie2</a>
              <a href='#/'>Categorie3</a>
              <a href='#/'>Categorie4</a>
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
                Brand
              </Box>
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.Categories}>
            <ul>
              <a href='#/'>Brand1</a>
              <a href='#/'>Brand2</a>
              <a href='#/'>Brand3</a>
              <a href='#/'>Brand4</a>
            </ul>
          </AccordionDetails>
        </Accordion>
      </div>

      <div>
        <Typography component='div'>
          <Box fontWeight={600} fontSize={20} m={1}>
            Recently Added
          </Box>
        </Typography>
        <div className={classes.RecentlyAdded}>
          <ul>
            <li>
              <SidebarProductsCard
                img={
                  'https://www.portotheme.com/wordpress/porto/shop35/wp-content/uploads/sites/178/2020/07/578239-300x300.jpg'
                }
                title={'Sample Product'}
                price={'29.00'}
                rating={'2'}
              />
            </li>
            <li>
              <SidebarProductsCard
                img={
                  'https://www.portotheme.com/wordpress/porto/shop35/wp-content/uploads/sites/178/2020/07/496465-300x300.jpg'
                }
                title={'Sample Product'}
                price={'29.00'}
                rating={'2'}
              />
            </li>
            <li>
              <SidebarProductsCard
                img={
                  'https://www.portotheme.com/wordpress/porto/shop35/wp-content/uploads/sites/178/2020/07/602180-300x300.jpg'
                }
                title={'Sample Product'}
                price={'29.00'}
                rating={'2'}
              />
            </li>
            <li>
              <SidebarProductsCard
                img={
                  'https://www.portotheme.com/wordpress/porto/shop35/wp-content/uploads/sites/178/2020/07/496465-300x300.jpg'
                }
                title={'Sample Product'}
                price={'29.00'}
                rating={'2'}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
