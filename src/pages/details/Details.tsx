import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import "./Details.scss";
import { MovieDetails, Actor } from "../../types/movies";
import { fetchMovieDetails, fetchMovieCast } from "../../utils/tmdbApi";
import { transformMovieDetails } from "../../utils/dataTransform";
import { useCategory } from "../../context/CategoryContext";

import WishlistLogo from "../../assets/img/wishlist.svg?react";
import WishListAddedTrending from "../../assets/img/wishlist-added-trending.svg?react";
import WishlistFilledLogo from "../../assets/img/wishlist-added-popular.svg?react";
import WishlistAddedTopRated from "../../assets/img/wishlist-added-toprated.svg?react";
import WishlistAddedNowPlaying from "../../assets/img/wishlist-added-nowplaying.svg?react";
import { Category } from "../../types/configuration";

const Details: React.FC = () => {
  const { id: movieId } = useParams<{ id: string }>();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const { selectedCategory } = useCategory();
  const [movieCast, setMovieCast] = useState<Actor[]>([]); // Assuming you will fetch and set movie cast later
  
  const checkMoviePreference = (id: number) =>
    wishlist.some((item) => item.id === Number(movieId));

  // const [isFavorite, setIsFavorite] = useState(checkMoviePreference(Number(movieId)));
  const isFavorite = useMemo(() => checkMoviePreference(Number(movieId)), [wishlist, movieId]);

  const handleWishListClick = (movieId: string, movie?:MovieDetails) => {
    if (isFavorite) {
      removeFromWishlist(Number(movieId));
      // setIsFavorite(false);
    } else {
      addToWishlist({
        id: Number(movieId),
        title: movie?.title ||"",
        poster_path: movie?.poster_path || "",
      });
      // setIsFavorite(true);
    }
  };

  const renderStars = (rating: number) => {
    const maxStars = 5; // Total number of stars
    const filledStars = Math.round((rating / 10) * maxStars); // Calculate filled stars based on rating
    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <svg
          name="rating-star"
          role="img"
          aria-label="rating-star"
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`star ${i <= filledStars ? "filled" : ""}`}
        >
          <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.417 8.253L12 18.897l-7.417 4.626L6 15.27 0 9.423l8.332-1.268z" />
        </svg>
      );
    }

    return <div className="star-rating">{stars}</div>;
  };

  useEffect(() => {
    const retrieveMovieDetails = async () => {
      try {
        const [movieCastData, movieDetails] = await Promise.all([
          fetchMovieCast(movieId || ""),
          fetchMovieDetails(movieId || ""),
        ]);
        const castNames = movieCastData.map((actor:Actor) => ({
          id: actor.id, 
          name: actor.name, 
          character: actor.character
        }));
        setMovieCast(castNames.slice(0, 10));

        const movie = transformMovieDetails(movieDetails);
        
        setMovie(movie);
        // setIsFavorite(checkMoviePreference(Number(movieId)));
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    retrieveMovieDetails();
  }, [movieId]);

  // useEffect(() => {
  //   setIsFavorite(checkMoviePreference(Number(movieId)));
  // }, [wishlist, movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div
      className={`details-container ${
        selectedCategory && selectedCategory.toLowerCase().replace(/\s+/g, "")
      }`}
      data-testid="details-container"
    >
      <div className="details-content">
        <div className="movie-poster">
          <div 
            className="wishlist-icon" 
            onClick={()=>handleWishListClick (movieId || "", movie)} 
            data-testid="wishlist-icon-details"
          >
            {!isFavorite ? (<WishlistLogo />) : selectedCategory === Category.TRENDING ? (<WishListAddedTrending />) : selectedCategory === Category.POPULAR ? (
              <WishlistFilledLogo />) : selectedCategory === Category.TOP_RATED ? (<WishlistAddedTopRated />) : (
              selectedCategory === Category.NOW_PLAYING && (<WishlistAddedNowPlaying />)
            )}
          </div>
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="movie-image"
          />
        </div>
        <div className="movie-info">
          <h1 className="movie-title">{movie.title}</h1>
          <div className="movie-rating">
            <h3 className="rating-label">Rating:</h3>
            {renderStars(movie.vote_average)}
          </div>
          <div className="movie-release-runtime">
            <h3 className="release-date">
              Release Date: {movie.release_date}
            </h3>
            <h3 className="runtime">Runtime: {movie.runtime} minutes</h3>
          </div>
          <div className="movie-genres">
            <h3 className="genres-label">Genres:</h3>
            <ul className="genres-list">
              {movie.genres.map((genre) => (
                <li key={genre.id} className="genre-item">
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="movie-overview">
            <h3 className="overview-label">Overview:</h3>
            {movie.overview}
          </div>
        </div>
      </div>
      <div className="movie-cast" data-testid="movie-cast">
        <ul className="cast-list" data-testid="cast-list">
          {movieCast.length > 0 ? (
            movieCast.map((actor) => (
              <li key={actor.id} className="cast-item" data-testid={`cast-item`}>
                <span className="actor-name">{actor.name}</span>
                <span className="actor-character"> "{actor.character}"</span>
              </li>
            ))
          ) : (
            <li className="cast-item">Cast information not available</li>
          )}
        </ul>
        </div>
    </div>
  );
};

export default Details;
