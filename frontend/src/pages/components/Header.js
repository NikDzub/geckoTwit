import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="header">
      <div className="logo">geckTwit</div>
      <div className="headLinks">
        <Link to={'/'}>HOME</Link>
        <Link to={'/search'}>SEARCH</Link>
      </div>
    </header>
  );
};
