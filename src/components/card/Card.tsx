import React from 'react';
import { Movie } from '../../types/movies';
import './Card.scss';

const Card: React.FC<Movie> = ({ movieId, movieImg, isFavorite, movieTitle }) => {
  return (
    <div className="card-container" data-movie-id={movieId}>
      <div className="image-container">
        <img src={movieImg} alt={movieTitle} className="movie-image" />
        <div className="overlay">
          <h3 className="movie-title">{movieTitle}</h3>
          {isFavorite && <span className="favorite-icon">❤️</span>}
        </div>
      </div>
    </div>
  );
};

export default Card;