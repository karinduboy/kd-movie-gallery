import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import Modal from '../modal/Modal';

import './header.scss';

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
      <div className="logo">Logo</div>
      <button className="wishlin" onClick={() => setIsModalOpen(true)}>❤️</button>
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
