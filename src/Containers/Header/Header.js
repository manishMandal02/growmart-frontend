import React from 'react';
import NavBar from '../../Components/Header/NavBar/NavBar';
import SearchBar from '../../Components/Header/SearchBar/SearchBar';
import TopHeaderMenu from '../../Components/Header/TopHeaderMenu/TopHeaderMenu';

const Header = () => {
  return (
    <header>
      <TopHeaderMenu />
      <SearchBar />
      <NavBar />
    </header>
  );
};

export default Header;
