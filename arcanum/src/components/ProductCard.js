import React from 'react';
import { BADGE_LABEL, fmt } from '../data/products';
import './ProductCard.css';

const ProductCard = ({ product, onAdd, added }) => {
  return (
    <div className="product-card">
      <div className="card-image-placeholder">
        {product.emoji}
      </div>
      <div className="card-overlay" />
      <div className={`card-badge badge-${product.badge}`}>
        {BADGE_LABEL[product.badge]}
      </div>
      <div className="card-body">
        <div className="card-era">{product.era} · {product.year}</div>
        <div className="card-title">{product.title}</div>
        <div className="card-author">{product.author}</div>
        <div className="card-footer">
          <div className="card-price">
            {product.origPrice && (
              <span className="orig">{fmt(product.origPrice)}</span>
            )}
            {fmt(product.price)}
          </div>
          <button
            className={`add-btn ${added ? 'added' : ''}`}
            onClick={() => onAdd(product)}
          >
            {added ? '✓ Added' : 'Acquire'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
