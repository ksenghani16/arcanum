import React, { useState } from 'react';
import { PRODUCTS, CATEGORIES, fmt } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = ({ onAddToCart, addedMap, onToast }) => {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === filter);

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-line" />
        <div className="hero-eyebrow">Est. MDCCCLIV · Rare Books &amp; Manuscripts</div>
        <h1 className="hero-title">
          Where <em>lost worlds</em><br />find new hands
        </h1>
        <p className="hero-sub">
          Curated folios, illuminated manuscripts, and rare scientific atlases
          from the 15th through 19th centuries. Each piece authenticated and catalogued.
        </p>
        <div className="hero-cta">
          <button
            className="btn-primary"
            onClick={() =>
              document.getElementById('catalogue').scrollIntoView({ behavior: 'smooth' })
            }
          >
            Browse Catalogue
          </button>
          <button className="btn-ghost" onClick={() => onToast('Our appraisal team will contact you shortly.')}>
            Request Appraisal
          </button>
        </div>
        <div className="hero-counter">172 · Authenticated Pieces · Available</div>
      </section>

      {/* ── Featured ── */}
      <div className="section" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="featured">
          <div className="featured-main">
            <div className="featured-main-bg" />
            <span className="badge-featured">✦ Editors' Selection</span>
            <h3>
              Liber Noctis<br />
              <em style={{ fontSize: '1rem', color: 'var(--muted)' }}>Anonymous, c.1490</em>
            </h3>
            <p>
              Perhaps the most mysterious manuscript in our possession — a 15th-century
              grimoire of unknown origin, bound in calfskin with hand-gilded marginalia.
            </p>
            <button className="btn-primary" onClick={() => onAddToCart(PRODUCTS[4])}>
              Acquire — {fmt(22000)}
            </button>
          </div>

          <div className="featured-side">
            {PRODUCTS.slice(0, 3).map((p) => (
              <div key={p.id} className="featured-side-item" onClick={() => onAddToCart(p)}>
                <div className="side-item-icon">{p.emoji}</div>
                <div>
                  <div className="side-item-title">{p.title}</div>
                  <div className="side-item-price">{fmt(p.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Catalogue ── */}
      <section className="section" id="catalogue">
        <div className="section-header">
          <span className="section-tag">Catalogue</span>
          <h2 className="section-title">Available Folios</h2>
          <div className="divider" />
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`filter-btn ${filter === c ? 'active' : ''}`}
              onClick={() => setFilter(c)}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="products-grid">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={onAddToCart}
              added={!!addedMap[p.id]}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
