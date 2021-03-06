import React from 'react';
import PropTypes from "prop-types";


const Header = ({ titulo }) => {
  //Por materialized se le agrega #! 
  return (
    <nav>
      <div className="nav-wrapper light-blue darken-2">
        <a href="#!" className="brand-logo">
          {titulo}
        </a>
      </div>
    </nav>
  );
}

Header.proTypes = {
  titulo: PropTypes.string.isRequired
}

export default Header;