import React from 'react';
import { fmt } from '../data/products';
import './CartDrawer.css';

const CartDrawer = ({ open, cart, onRemove, onClose, onToast }) => {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <>
      <div className={`overlay ${open ? 'visible' : ''}`} onClick={onClose} />
      <aside className={`cart-drawer ${open ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Collection</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="cart-empty">Your collection awaits…</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-emoji">{item.emoji}</div>
                <div className="cart-item-info">
                  <div className="cart-item-title">{item.title}</div>
                  <div className="cart-item-price">
                    {fmt(item.price)} × {item.qty}
                  </div>
                </div>
                <button className="remove-item" onClick={() => onRemove(item.id)}>✕</button>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span className="cart-total-label">Total Acquisition Cost</span>
            <span className="cart-total-amount">{fmt(total)}</span>
          </div>
          <button
            className="checkout-btn"
            onClick={() => onToast("Proceeding to secure checkout…")}
          >
            Proceed to Checkout
          </button>
        </div>
      </aside>
    </>
  );
};

export default CartDrawer;
