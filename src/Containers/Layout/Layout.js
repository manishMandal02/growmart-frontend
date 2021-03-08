import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { useWindowSize } from '../../Hooks/useWindowSize/useWindowSize';
import Header from '../Header/Header';
import Footer from '../../Components/Footer/Footer';
import MainBody from '../MainBody/MainBody';
import ProdcutPage from '../../Components/MainBody/ProdcutPage/ProdcutPage';
import RegisterPage from '../../Components/Auth/RegisterPage/RegisterPage';
import LoginPage from '../../Components/Auth/LoginPage/LoginPage';
import MyAccountPage from '../../Components/Auth/MyAccountPage/MyAccountPage';
import CartPage from '../../Components/Auth/CartPage/CartPage';
import CreateOrderPage from '../../Components/Auth/OrderPage/CreateOrderPage/CreateOrderPage';
import OrderPage from '../../Components/Auth/OrderPage/OrderPage';
import ProfilePage from '../../Components/Auth/MyAccountPage/MyProfileMobile/MyProfileMobile';
import AddressPageMobile from '../../Components/Auth/MyAccountPage/MyAddressMobile/MyAddressMobile';
import MyOrdersMobilePage from '../../Components/Auth/MyAccountPage/MyOrdersMobile/MyOrdersMobile';

const Layout = () => {
  const [width] = useWindowSize();
  return (
    <Router>
      <Header />
      <main>
        {width <= 900 && (
          <>
            <Route path='/my/account' component={MyAccountPage} />
            <Route path='/my/profile' component={ProfilePage} />
            <Route path='/my/address' component={AddressPageMobile} />
            <Route path='/my/orders' component={MyOrdersMobilePage} />
          </>
        )}
        {width > 900 && (
          <>
            <Route path='/my/:keyword' component={MyAccountPage} />
          </>
        )}
        <Route
          path='/user/create-order/:key?'
          component={CreateOrderPage}
          exact
        />
        <Route path='/user/order/:id' component={OrderPage} />
        <Route path='/user/cart' component={CartPage} exact />
        <Route path='/register' component={RegisterPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/product/:id' component={ProdcutPage} />
        <Route path='/price/:price' component={MainBody} exact />
        <Route path='/page/:pageNumber' component={MainBody} exact />
        <Route
          path='/page/:pageNumber/price/:price'
          component={MainBody}
          exact
        />
        <Route path='/search/:keyword' component={MainBody} exact />
        <Route path='/category/:category' component={MainBody} exact />
        <Route
          path='/category/:category/page/:pageNumber'
          component={MainBody}
          exact
        />
        <Route path='/brand/:brand' component={MainBody} exact />
        <Route
          path='/brand/:brand/page/:pageNumber'
          component={MainBody}
          exact
        />
        <Route
          path='/search/:keyword/page/:pageNumber'
          component={MainBody}
          exact
        />
        <Route
          path='/search/:keyword/price/:price'
          component={MainBody}
          exact
        />
        <Route
          path='/search/:keyword/price/:price/page/:pageNumber'
          component={MainBody}
          exact
        />
        <Route path='/' component={MainBody} exact />
      </main>
      {width > 900 && <Footer />}
    </Router>
  );
};

export default Layout;
