import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import classes from './Footer.module.scss';

import { Facebook, Twitter, LinkedIn } from '@material-ui/icons';
import {
  FaCcPaypal,
  FaCcStripe,
  FaCcVisa,
  FaCcMastercard,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <div className={classes.FooterTop}>
        <div className={classes.FooterInfo}>
          <h4>About Us</h4>
          <ul>
            <Link key={uuidv4()} to='#'>
              About Us
            </Link>
            <Link key={uuidv4()} to='#'>
              Our Team
            </Link>
            <Link key={uuidv4()} to='#'>
              Careers
            </Link>
            <Link key={uuidv4()} to='#'>
              Our Stores
            </Link>
          </ul>
        </div>
        <div className={classes.FooterInfo}>
          <h4>Customer Service</h4>
          <ul>
            <Link key={uuidv4()} to='#'>
              Login
            </Link>
            <Link key={uuidv4()} to='#'>
              Help /&/ FAQs
            </Link>
            <Link key={uuidv4()} to='#'>
              Order Tracking
            </Link>
            <Link key={uuidv4()} to='#'>
              Shipping & Delivery
            </Link>
            <Link key={uuidv4()} to='#'>
              Orders History
            </Link>
          </ul>
        </div>

        <div className={classes.FooterInfo}>
          <h4>More Information</h4>
          <ul>
            <Link key={uuidv4()} to='#'>
              Affiliates
            </Link>
            <Link key={uuidv4()} to='#'>
              Refer Link Friend
            </Link>
            <Link key={uuidv4()} to='#'>
              Git Vouchers
            </Link>
            <Link key={uuidv4()} to='#'>
              Student Program
            </Link>
          </ul>
        </div>

        <div className={classes.FooterInfo}>
          <div className={classes.Container}>
            <h4>Social Media</h4>
            <div className={classes.SocialIconContainer}>
              <Link key={uuidv4()} to='#'>
                <LinkedIn />
              </Link>
              <Link key={uuidv4()} to='#'>
                <Twitter />
              </Link>
              <Link key={uuidv4()} to='#'>
                <Facebook />
              </Link>
            </div>
            <h4>Payment Methods</h4>
            <ul className={classes.PaymentsIcon}>
              <li key={uuidv4()}>
                <FaCcPaypal />
              </li>
              <li key={uuidv4()}>
                <FaCcStripe />
              </li>
              <li key={uuidv4()}>
                <FaCcVisa />
              </li>
              <li key={uuidv4()}>
                <FaCcMastercard />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={classes.FooterBottom}>
        <p>Manish Mandal. © 2021. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
