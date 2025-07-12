export interface Movie {
  movieId: number;
  movieImg: string;
  isFavorite: boolean;
  movieTitle: string;
}

export type CarouselProps = {
  movies: Movie[];
};