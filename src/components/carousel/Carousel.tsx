import React from 'react';
import { CarouselProps, MoviesListResponse } from '../../types/movies';
import { Category } from '../../types/configuration';
import Card from '../card/Card';
import './carousel.scss';


const Carousel: React.FC<CarouselProps> = ({ movies, onCardClick, loading, category = Category.TRENDING }) => {
  const results = movies.results || [];
  
  if (loading) {
    // Render skeleton loader while loading
    return (
      <div className="carousel-skeleton" data-testid={`${category}-skeleton-container`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="skeleton-card"></div>
        ))}
      </div>
    );
  }

  if (!results || results.length === 0) {
    return <div className="carousel-container">No movies available</div>;
  }

  return (
    <div className="carousel-container" data-testid={`${category}-carousel-container`}>
      <div className="carousel">
        {results
          .filter((movie: { id: React.Key | null | undefined }) => typeof movie.id === 'number')
          .map((movie: { id: number; poster_path: any; title: string;}) => (
            <div
              key={movie.id}
              className="carousel-card"
              onClick={onCardClick}
              data-testid="carousel-card"
            >
              <Card
                data-testid={`card-${movie.id}`}
                id={movie.id}
                poster_path={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                isFavorite={false}
                title={movie.title}
                category={category}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Carousel;