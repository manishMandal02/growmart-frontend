import React from 'react';

import classes from './Footer.module.scss';

import { Facebook, Twitter, LinkedIn } from '@material-ui/icons';
import {
  FaCcPaypal,
  FaCcStripe,
  FaCcVisa,
  FaCcMastercard,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <div className={classes.Footer}>
      <div className={classes.FooterTop}>
        <div className={classes.FooterInfo}>
          <h4>Customer Service</h4>
          <ul>
            <a href='#/'>Login</a>
            <a href='#/'>Help /&/ FAQs</a>
            <a href='#/'>Order Tracking</a>
            <a href='#/'>Shipping & Delivery</a>
            <a href='#/'>Orders History</a>
          </ul>
        </div>
        <div className={classes.FooterInfo}>
          <h4>About Us</h4>
          <ul>
            <a href='#/'>About Us</a>
            <a href='#/'>Our Team</a>
            <a href='#/'>Careers</a>
            <a href='#/'>Our Stores</a>
          </ul>
        </div>
        <div className={classes.FooterInfo}>
          <h4>More Information</h4>
          <ul>
            <a href='#/'>Affiliates</a>
            <a href='#/'>Refer a Friend</a>
            <a href='#/'>Git Vouchers</a>
            <a href='#/'>Student Program</a>
          </ul>
        </div>
        <div className={classes.FooterInfo}>
          <div className={classes.Container}>
            <div>
              <h4>Social Media</h4>
              <div className={classes.SocialIconContainer}>
                <a href='/'>
                  <LinkedIn />
                </a>
                <a href='/'>
                  <Twitter />
                </a>
                <a href='/'>
                  <Facebook />
                </a>
              </div>
            </div>
            <h4>Payment Methods</h4>
            <ul className={classes.PaymentsIcon}>
              <li>
                <FaCcPaypal />
              </li>
              <li>
                <FaCcStripe />
              </li>
              <li>
                <FaCcVisa />
              </li>
              <li>
                <FaCcMastercard />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={classes.FooterBottom}>
        <p>Manish Mandal. © 2021. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
