import { MoviesListType } from "../types/configuration";

const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Securely load the API key from .env

// Function to retrieve queryUrl part according to the list type value
const getQueryUrl = (listType: 'popular' | 'now_playing' | 'top_rated' | 'trending_day' | 'trending_week') => {
    switch (listType) {
        case 'trending_week':
            return '/trending/movie/week';
        case 'trending_day':
            return '/trending/movie/day';
        default:
            return `/movie/${listType}`;
    }
};

// Generic function to fetch movie lists
export const fetchMoviesList = async (listType: MoviesListType) => {
    const queryUrl = getQueryUrl(listType);
  const response = await fetch(`${TMDB_API_BASE_URL}${queryUrl}?api_key=${TMDB_API_KEY}&language=en-US`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${listType} movies`);
  }
  return response.json();
};

// Fetch movie details by ID
export const fetchMovieDetails = async (movieId: string) => {
  const response = await fetch(`${TMDB_API_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`);
  if (!response.ok) {
    throw new Error(`Failed to fetch details for movie ID: ${movieId}`);
  }
  return response.json();
};
