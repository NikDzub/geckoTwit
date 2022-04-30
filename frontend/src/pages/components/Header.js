import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="header">
      <div>
        <Link to={'/'}>HOME</Link>
      </div>
      <div>
        <Link to={'/search'}>SEARCH</Link>
      </div>
    </header>
  );
};
