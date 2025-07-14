import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import Modal from '../modal/Modal';

import './header.scss';
import Logo from '../../assets/img/logo.svg?react';
import WishlistLogo from '../../assets/img/wishlist.svg?react';
import WishListAdded from '../../assets/img/wishlist-added-popular.svg?react';

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { wishlist, removeFromWishlist } = useWishlist();
  const location = useLocation();

  // Close the modal when the location changes
  useEffect(() => {
    setIsModalOpen(false);
  }, [location]);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="wishlist-container" onClick={() => setIsModalOpen(true)}>
        <WishlistLogo className="wishlist-icon" />
        {wishlist.length > 0 && (
          <div className="wishlist-count">{wishlist.length}</div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="wishlist-modal">
          <h2>Your Wishlist</h2>
          <ul>
            {wishlist.map((movie) => (
              <li key={movie.id}>
                <img src={movie.poster_path} alt={movie.poster_path} />
                <div>
                  <h3>{movie.title}</h3>
                  <button onClick={() => removeFromWishlist(movie.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </header>
  );
};

export default Header;
