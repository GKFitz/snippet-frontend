import React from 'react';
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <nav className="nav">
      <Link to="/">
        <div id="home">Home</div>
      </Link>
      <br/>
      <br/>
      <Link to="/about">
        <div id="about">About</div>
      </Link>
    </nav>
  );
}

export default Header;
