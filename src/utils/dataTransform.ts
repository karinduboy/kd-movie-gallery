import { MovieDetails, MovieInformation } from "../types/movies";

export const transformMovieDetails = (movie: MovieInformation): MovieDetails => {
  if (!movie || !movie.title || !movie.overview || !movie.release_date) {
    throw new Error("Invalid movie data");
  }

  // Transform the movie data to match the MovieDetails type
  const transformedMovie: MovieDetails = {
    title: movie.title,
    overview: movie.overview,
    release_date: new Date(movie.release_date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    poster_path: movie.poster_path
      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
      : '',
    vote_average: typeof movie.vote_average === 'string' ? parseFloat(movie.vote_average) : movie.vote_average || 0,
    genres: movie.genres,
    runtime: movie.runtime,
  };

  return transformedMovie;
};