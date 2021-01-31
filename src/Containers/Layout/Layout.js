import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ProdcutPage from '../../Components/MainBody/ProdcutPage/ProdcutPage';

import Footer from '../../Components/Footer/Footer';
import Header from '../Header/Header';
import MainBody from '../MainBody/MainBody';

const Layout = () => {
  return (
    <Router>
      <Header />
      <main>
        <Route path='/' component={MainBody} exact />
        <Route path='/product/:id' component={ProdcutPage} />
      </main>
      <Footer />
    </Router>
  );
};

export default Layout;
