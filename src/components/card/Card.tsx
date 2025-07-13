import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { MovieInformation } from '../../types/movies';
import './Card.scss';

type CardProps = Pick<MovieInformation, 'id' | 'poster_path' | 'title' | 'isFavorite'>;

const Card: React.FC<CardProps> = (props) => {
    const { id, poster_path, title, isFavorite } = props;
  const navigate = useNavigate();
  const { addToWishlist } = useWishlist();

  const handleCardClick = () => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="card-container" data-movie-id={id} onClick={handleCardClick}>
      <div className="image-container">
        <img src={poster_path} alt={title} className="movie-image" />
        <div className="overlay">
            <button className="wishlist-button" onClick={() => addToWishlist({id, title, poster_path})}>
                Add to Wishlist
            </button>   
          <h3 className="movie-title">{title}</h3>
          {isFavorite && <span className="favorite-icon">❤️</span>}
        </div>
      </div>
    </div>
  );
};

export default Card;