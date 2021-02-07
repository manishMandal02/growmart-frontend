import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './OrderPage.module.scss';
import { VerifiedUser } from '@material-ui/icons';
import { Snackbar, Step, StepLabel, Stepper } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

//###########
const OrderPage = ({ history }) => {
  //Redirect
  const { userInfo } = useSelector((state) => state.user);

  //State
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  //Stepper
  const [activeStep, setActiveStep] = useState(1);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Handle snackbar state
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const { cartItems } = useSelector((state) => state.cart);
  //JSX return
  return (
    <div className={classes.Container}>
      <div className={classes.LeftWrapper}>
        <div className={classes.Stepper}>
          <Stepper activeStep={activeStep} alternativeLabel>
            <Step>
              <StepLabel>SignIn</StepLabel>
            </Step>
            <Step>
              <StepLabel>Shipping Address</StepLabel>
            </Step>
            <Step>
              <StepLabel>Payment Method</StepLabel>
            </Step>
            <Step>
              <StepLabel>Place Order</StepLabel>
            </Step>
          </Stepper>
        </div>
        <span className={classes.LeftContainer}>
          <p>hi</p>
        </span>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
      >
        <Alert severity='success' variant='filled'>
          <strong>Hello</strong>
        </Alert>
      </Snackbar>
      <div className={classes.RightWrapper}>
        <div className={classes.RightContainer}>
          <p>Price Details</p>
          <div>
            <p>
              {`Price (${cartItems.length}) ${
                cartItems.length >= 0 ? 'items' : 'item'
              }`}{' '}
              <span>${'289.00'}</span>
            </p>
            <p>
              Tax % <span>${'0'}</span>
            </p>
            <p>
              Shipping Charges <span>{'FREE'}</span>
            </p>
            <p>
              Total Amount <span>${'1240.00'}</span>
            </p>
          </div>
          <button
            disabled={cartItems.length <= 0}
            onClick={() => history.push('/user/order')}
          >
            Checkout
          </button>
        </div>
        <span>
          <VerifiedUser />{' '}
          <p>Safe and Secure Payments.Easy returns.100% Authentic products.</p>
        </span>
      </div>
    </div>
  );
};

export default OrderPage;
