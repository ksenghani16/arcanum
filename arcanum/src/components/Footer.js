import React from 'react';
import './Footer.css';

const FOOTER_COLS = [
  { title: "Explore",  links: ["Collections", "New Acquisitions", "Rare Manuscripts", "Scientific Atlases"] },
  { title: "Services", links: ["Book Appraisal", "Restoration", "Private Sales", "Consignment"] },
  { title: "Contact",  links: ["Visit Our Vault", "Schedule a Viewing", "Newsletter", "Press Enquiries"] },
];

const Footer = () => {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="logo"><span>Arc</span>anum</span>
          <p>
            Purveyors of exceptional rare books, manuscripts, and printed ephemera since 1854.
            Each item authenticated and catalogued with full provenance.
          </p>
        </div>
        {FOOTER_COLS.map((col) => (
          <div key={col.title} className="footer-col">
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((l) => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© 2025 Arcanum Rare Books · All rights reserved</span>
        <span className="pwa-badge">⚡ PWA Enabled</span>
        <span>Made for TE-IT MAD &amp; PWA Lab · Experiment 8</span>
      </div>
    </footer>
  );
};

export default Footer;
