import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import "./Details.scss";
import { MovieDetails } from "../../types/movies";
import { fetchMovieDetails } from "../../utils/tmdbApi";
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
  const [isFavorite, setIsFavorite] = useState(false);

  const checkMoviePreference = (id: number) =>
    wishlist.some((item) => item.id === Number(movieId));

  const handleWishListClick = () => {
    if (isFavorite) {
      removeFromWishlist(Number(movieId));
    } else {
      addToWishlist({
        id: Number(movieId),
        title: movie?.title || "",
        poster_path: movie?.poster_path || "",
      });
    }
  };

  const renderStars = (rating: number) => {
    const maxStars = 5; // Total number of stars
    const filledStars = Math.round((rating / 10) * maxStars); // Calculate filled stars based on rating
    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <svg
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
        const movieDetails = await fetchMovieDetails(movieId || "");
        console.log("Movie details:", movieDetails);
        const movie = transformMovieDetails(movieDetails);
        console.log("Transformed movie data:", movie);
        setMovie(movie);
        setIsFavorite(checkMoviePreference(Number(movieId)));
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    retrieveMovieDetails();
  }, [movieId]);

  useEffect(() => {
    setIsFavorite(checkMoviePreference(Number(movieId)));
  }, [wishlist]);

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
    >
      <div className="details-content">
        <div className="movie-poster">
          <div className="wishlist-icon" onClick={handleWishListClick}>
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
          <div className="movie-release-runtime">
            <span className="release-date">
              Release Date: {movie.release_date}
            </span>
            <span className="runtime">Runtime: {movie.runtime} minutes</span>
          </div>
          <div className="movie-rating">
            <span className="rating-label">Rating:</span>
            {renderStars(movie.vote_average)}
          </div>
          <p className="movie-overview">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
