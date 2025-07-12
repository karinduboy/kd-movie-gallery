import React from 'react';
import { CarouselProps } from '../../types/movies';
import Card from '../card/Card';
import './carousel.scss';

const Carousel: React.FC<CarouselProps> = ({ movies }) => {
  return (
    <div className="carousel-container">
      <div className="carousel">
        {movies.map((movie) => (
          <Card
            key={movie.movieId}
            movieId={movie.movieId}
            movieImg={movie.movieImg}
            isFavorite={movie.isFavorite}
            movieTitle={movie.movieTitle}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;