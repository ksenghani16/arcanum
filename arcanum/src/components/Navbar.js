import React from 'react';
import './Navbar.css';

const Navbar = ({ cartCount, onCartOpen, installEvent, onInstall, onMenuOpen }) => {
  return (
    <nav className="nav">
      <div className="logo"><span>Arc</span>anum</div>

      <ul className="nav-links">
        {["Collections", "Catalogue", "Provenance", "About"].map((l) => (
          <li key={l}><a href="#">{l}</a></li>
        ))}
      </ul>

      <div className="nav-right">
        {installEvent && (
          <button className="install-btn visible" onClick={onInstall}>
            ⊕ Install App
          </button>
        )}
        <button className="cart-btn" onClick={onCartOpen}>
          Collection ({cartCount})
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
        <button className="hamburger" onClick={onMenuOpen}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
