import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../Components/Header/NavBar/NavBar';
import SearchBar from '../../Components/Header/SearchBar/SearchBar';
import TopHeaderMenu from '../../Components/Header/TopHeaderMenu/TopHeaderMenu';

const Header = () => {
  const location = useLocation();
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
      <SearchBar />
      <NavBar />
    </header>
  );
};

export default Header;
