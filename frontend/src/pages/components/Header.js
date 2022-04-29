import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="header">
      <div>
        <Link to={'/'}>Home</Link>
      </div>
      <div>
        <Link to={'/search'}>Search</Link>
      </div>
    </header>
  );
};
