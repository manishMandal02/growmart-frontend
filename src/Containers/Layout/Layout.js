import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../../Components/Footer/Footer';
import MainBody from '../MainBody/MainBody';
import ProdcutPage from '../../Components/MainBody/ProdcutPage/ProdcutPage';
import RegisterPage from '../../Components/Auth/RegisterPage/RegisterPage';
import LoginPage from '../../Components/Auth/LoginPage/LoginPage';
import MyAccountPage from '../../Components/Auth/MyAccountPage/MyAccountPage';
import CartPage from '../../Components/Auth/CartPage/CartPage';
import OrderPage from '../../Components/Auth/OrderPage/OrderPage';

const Layout = () => {
  return (
    <Router>
      <Header />
      <main>
        <Route path='/my/:keyword' component={MyAccountPage} />
        <Route path='/user/order/:key?' component={OrderPage} />
        <Route path='/user/cart' component={CartPage} exact />
        <Route path='/register' component={RegisterPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/product/:id' component={ProdcutPage} />
        <Route path='/' component={MainBody} exact />
      </main>
      <Footer />
    </Router>
  );
};

export default Layout;
