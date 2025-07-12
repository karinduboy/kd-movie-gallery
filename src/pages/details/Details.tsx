import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Details.scss';

interface MovieDetails {
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  runtime: number;
}

const Details: React.FC = () => {
  const { id: movieId } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = 'c6f4b7af00ff89712efe89669fe19897'; // Replace with your TMDB API key
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId ? parseInt(movieId) : ''}?api_key=${apiKey}&language=en-US`
        );
        const data = await response.json();
        const newReleaseDate = new Date(data.release_date).toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
          });
        const newPosterPath = data.poster_path ? `https://image.tmdb.org/t/p/original${data.poster_path}` : '';
        const movie = (
            {...data, 
            release_date: newReleaseDate, 
            poster_path: newPosterPath, 
            runtime: data.runtime || 0, 
            genres: data.genres.map((genre: { id: number; name: string }) => ({ 
                id: genre.id, name: genre.name 
            })), 
            vote_average: data.vote_average.toFixed(1)
        } as MovieDetails);
        setMovie(movie);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="details-container">
      <div className="details-content">
        <div className="image-placeholder">
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="movie-image"
          />
        </div>
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.runtime} minutes
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
