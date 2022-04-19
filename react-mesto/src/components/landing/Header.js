import React from 'react';
import logo from '../../images/logo.svg';

function Header(){
  return (
    <header className="header">
      <a href="#"><img src={logo} alt="логотип" className="header__logo" /></a>
    </header>
  )
}

export default Header;
