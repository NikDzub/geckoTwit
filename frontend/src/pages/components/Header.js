import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="header">
      <div className="logo">geckTwit</div>
      <div className="headLinks">
        <Link to={useLocation().pathname == '/' ? 'about' : ''}>
          {useLocation().pathname == '/' ? 'ABOUT' : 'HOME'}
        </Link>
      </div>
    </header>
  );
};
