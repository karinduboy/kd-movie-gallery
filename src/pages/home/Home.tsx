import React, { useEffect, useState } from 'react';
import Carousel from '../../components/carousel/Carousel';
import { MoviesListResponse } from '../../types/movies';
import './home.scss';

const Home: React.FC = () => {
    const [loading, setLoading] = useState(true);
  const [popularMovies, setPopularMovies] = useState<MoviesListResponse[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<MoviesListResponse[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<MoviesListResponse[]>([]);

  const apiKey = 'c6f4b7af00ff89712efe89669fe19897'; // Replace with your TMDB API key
  const baseUrl = 'https://api.themoviedb.org/3';

  const fetchMovies = async (endpoint: string, setter: React.Dispatch<React.SetStateAction<MoviesListResponse[]>>) => {
    try {
        const fetchUrl = `${baseUrl}${endpoint}?api_key=${apiKey}&language=en-US`;
        console.log(`Fetching movies from: ${fetchUrl}`);
      // Fetch movies from the TMDB API
      // The endpoint can be '/movie/popular', '/movie/now_playing', or '/movie/top_rated'
      // The setter function will update the state with the fetched movies
      const response = await fetch(fetchUrl);
      const data = await response.json();
      setter(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    const fetchAllMovies = async () => {
      setLoading(true);
      await Promise.all([
        fetchMovies('/movie/popular', setPopularMovies),
        fetchMovies('/movie/now_playing', setNowPlayingMovies),
        fetchMovies('/movie/top_rated', setTopRatedMovies),
      ]);
      setLoading(false);
    };

    fetchAllMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="main-content">
      <section className="popular-movies">
        <h2 className="category">Popular Movies</h2>
        <Carousel movies={popularMovies} />
      </section>
      <section className="now-playing-movies">
        <h2 className="category">Now Playing</h2>
        <Carousel movies={nowPlayingMovies} />
      </section>
      <section className="top-rated-movies">
        <h2 className="category">Top Rated</h2>
        <Carousel movies={topRatedMovies} />
      </section>
    </main>
  );
};

export default Home;