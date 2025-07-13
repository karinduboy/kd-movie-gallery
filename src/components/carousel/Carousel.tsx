import React from 'react';
import { CarouselProps , MoviesListResponse } from '../../types/movies';
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
          .map((movie: { id: number; poster_path: any; title: string; release_date: string; overview: string; }) => (
            <Card
                  key={movie.id}
                  id={movie.id}
                  poster_path={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                  isFavorite={false}
                  title={movie.title}
                  release_date={movie.release_date}
                  overview={movie.overview} adult={false} backdrop_path={''} genre_ids={[]} original_language={''} original_title={''} popularity={0} video={false} vote_average={0} vote_count={0}          />
          ))}
      </div>
    </div>
  );
};

export default Carousel;