import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../Components/Header/NavBar/NavBar';
import SearchBar from '../../Components/Header/SearchBar/SearchBar';
import TopHeaderMenu from '../../Components/Header/TopHeaderMenu/TopHeaderMenu';

import { useWindowSize } from '../../Hooks/useWindowSize/useWindowSize';
const Header = () => {
  const location = useLocation();

  const [width] = useWindowSize();
  return (
    <header
      style={{
        position: 'sticky',
        top: '0',
        zIndex: '50',
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
        boxShadow: '#00000026 1.95px 1.95px 2.6px',
      }}
    >
      {location.pathname === '/' ? <TopHeaderMenu /> : null}
      {width > 900 && <SearchBar />}
      {width <= 900 &&
        (location.pathname === '/my/address' ||
        location.pathname === '/my/profile' ||
        location.pathname === '/my/account' ||
        location.pathname === '/my/orders' ||
        location.pathname === '/user/create-order' ||
        location.pathname === '/user/cart' ? null : (
          <SearchBar />
        ))}

      {width > 900 && <NavBar />}
      {width <= 900 &&
        (location.pathname === '/my/address' ||
        location.pathname === '/my/profile' ||
        location.pathname === '/my/account' ||
        location.pathname.split('/')[1] === 'product' ||
        location.pathname === '/my/orders' ||
        location.pathname === '/user/create-order' ||
        location.pathname === '/user/cart' ? null : (
          <NavBar />
        ))}
    </header>
  );
};

export default Header;
