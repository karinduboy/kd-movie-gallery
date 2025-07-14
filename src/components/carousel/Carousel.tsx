import React from 'react';
import { CarouselProps } from '../../types/movies';
import Card from '../card/Card';
import './carousel.scss';

const Carousel: React.FC<CarouselProps> = (props) => {
    const { movies } = props;
    const results = movies.results || [];
  if (!results || results.length === 0) {
    return <div className="carousel-container">No movies available</div>;
  }

  return (
    <div className="carousel-container">
      <div className="carousel">
        {results
          .filter((movie: { id: React.Key | null | undefined }) => typeof movie.id === 'number')
          .map((movie: { id: number; poster_path: any; title: string;}) => (
            <Card
                key={movie.id}
                id={movie.id}
                poster_path={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                isFavorite={false}
                title={movie.title}
            />
          ))}
      </div>
    </div>
  );
};

export default Carousel;