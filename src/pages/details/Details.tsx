import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import './Details.scss';
import { MovieDetails } from '../../types/movies';
import { fetchMovieDetails } from '../../utils/tmdbApi';
import { transformMovieDetails } from '../../utils/dataTransform';


const Details: React.FC = () => {
  const { id: movieId } = useParams<{ id: string }>();
  const { addToWishlist } = useWishlist();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
      const retrieveMovieDetails = async () => {
          try {
            const movieDetails = await fetchMovieDetails(movieId || '');
            console.log('Movie details:', movieDetails);
            const movie = transformMovieDetails(movieDetails);
            console.log('Transformed movie data:', movie);
        setMovie(movie);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    retrieveMovieDetails();
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
          <button className="wishlist-button" onClick={() => addToWishlist(movie)}>
            Add to Wishlist
          </button>
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
