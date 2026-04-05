import React from 'react';
import './MobileMenu.css';

const MobileMenu = ({ open, onClose }) => {
  return (
    <div className={`mobile-menu ${open ? 'open' : ''}`}>
      <button className="mob-close" onClick={onClose}>✕</button>
      {["Collections", "Catalogue", "Provenance", "About"].map((l) => (
        <a key={l} href="#" onClick={onClose}>{l}</a>
      ))}
    </div>
  );
};

export default MobileMenu;
