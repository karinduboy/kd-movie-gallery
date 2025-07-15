import { Category } from "configuration";

// Type definitions for movie-related data structures and components
export interface CarouselProps {
  movies: MoviesListResponse;
  onCardClick?: () => void;
  loading?: boolean;
  category: string;
}


export type MovieInformation = {
  key?: string;
  isFavorite?: boolean;
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: { id: number; name: string }[];
  homepage?: string;
  id: number;
  imdb_id?: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: { id: number; logo_path: string; name: string; origin_country: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: { iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type MoviesListResponse = {
  results: MovieInformation[];
  page: number;
  dates?: {
    maximum: string;
    minimum: string;
  };
  total_pages: number;
  total_results: number;
}
export type MovieCard = Pick<MovieInformation, 'id' | 'poster_path' | 'title' | 'isFavorite'> & {
  category: Category;
};

export type WishListMovie = Pick<MovieInformation, 'id' | 'title' | 'poster_path'>;

export type MovieDetails = Pick<MovieInformation,
  'title' | 'overview' | 'release_date' | 'poster_path' | 'vote_average' | 'genres' | 'runtime'>

