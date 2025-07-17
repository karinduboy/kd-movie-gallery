import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCategory } from '../../context/CategoryContext';
import { MovieCard } from '../../types/movies';
import { Category } from '../../types/configuration';

import WishlistLogo from '../../assets/img/wishlist.svg?react';
import WishlistAddedLogo from '../../assets/img/wishlist-added.svg?react';

import './Card.scss';

const categoryColors:Record<Category, string> = {
  [Category.TRENDING]: 'red',
  [Category.POPULAR]: '#e18d0c',
  [Category.TOP_RATED]: '#35af01',
  [Category.NOW_PLAYING]: '#23bcd6',
};

const Card: React.FC<MovieCard> = (props) => {
  const { id, poster_path, title, category = Category.POPULAR} = props;
  const navigate = useNavigate();
  const { setSelectedCategory } = useCategory();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isFavorite = wishlist.some((movie) => movie.id === id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from propagating to the card click handler
    if (isFavorite) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, poster_path, title });
    }
  };

  const handleCardClick = () => {
    setSelectedCategory(category);
    navigate(`/details/${id}`);
  };

  return (
    <div className="card-container" data-movie-id={id} onClick={handleCardClick} data-testid="card-container">
      <div className="image-container">
        <img src={poster_path} alt={title} className="movie-image" />
        <div className="wishlist-icon" onClick={handleWishlistToggle} data-testid="wishlist-icon">
        {isFavorite ? (
            <WishlistAddedLogo style={{ fill: categoryColors[category]}} data-testis="wishlist-added-icon"/>
          ) : (
            <WishlistLogo style={{ fill: categoryColors[category]}} data-testis="wishlist-icon"/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;