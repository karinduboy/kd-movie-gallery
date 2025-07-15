import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { MovieInformation } from '../../types/movies';

import WishlistLogo from '../../assets/img/wishlist.svg?react';
import WishListFilledLogo from '../../assets/img/wishlist-added-popular.svg?react';

import './Card.scss';

type CardProps = Pick<MovieInformation, 'id' | 'poster_path' | 'title' | 'isFavorite'>;

const Card: React.FC<CardProps> = (props) => {
    const { id, poster_path, title, isFavorite } = props;
  const navigate = useNavigate();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isFavoriteMovie = wishlist.some((movie) => movie.id === id);

  const handleWisslistToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from propagating to the card click handler
    if (isFavoriteMovie) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, poster_path, title });
    }
  };

  const handleCardClick = () => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="card-container" data-movie-id={id} onClick={handleCardClick}>
      <div className="image-container">
        <img src={poster_path} alt={title} className="movie-image" />
        <div className="wishlist-icon" onClick={handleWisslistToggle}>
          {isFavoriteMovie ? <WishListFilledLogo /> : <WishlistLogo />}
        </div>
      </div>
    </div>
  );
};

export default Card;