import React from 'react';
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <nav className="nav">
      <Link to="/">
        <div>Code Cache App</div>
      </Link>
      <Link to="/about">
        <div>About</div>
      </Link>
    </nav>
  );
}

export default Header;
