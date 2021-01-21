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
            <Typography component='div'>
              <Box fontWeight={600} fontSize={20} m={1}>
                Filter By Price
              </Box>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Filter By Price</Typography>
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
          <AccordionDetails>
            <Typography>
              <li>Categories1</li>
              <li>Categories2</li>
              <li>Categories3</li>
              <li>Categories4</li>
            </Typography>
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
          <AccordionDetails>
            <Typography>
              <li>Brand1</li>
              <li>Brand2</li>
              <li>Brand3</li>
              <li>Brand4</li>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>

      <div>
        <Typography component='div'>
          <Box fontWeight={600} fontSize={20} m={1}>
            Recently Added
          </Box>
        </Typography>
        <ul>
          <li>Product1</li>
          <li>Product2</li>
          <li>Product3</li>
          <li>Product4</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
