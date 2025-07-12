import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.scss';
import { MovieDetails } from '../../types/movies';

const Card: React.FC<MovieDetails> = ({ id, poster_path, isFavorite, title }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="card-container" data-movie-id={id} onClick={handleCardClick}>
      <div className="image-container">
        <img src={poster_path} alt={title} className="movie-image" />
        <div className="overlay">
          <h3 className="movie-title">{title}</h3>
          {isFavorite && <span className="favorite-icon">❤️</span>}
        </div>
      </div>
    </div>
  );
};

export default Card;