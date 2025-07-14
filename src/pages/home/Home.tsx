import React, { useEffect, useState } from 'react';
import Carousel from '../../components/carousel/Carousel';
import { fetchMoviesList } from '../../utils/tmdbApi';
import './home.scss';
import { MoviesListResponse } from '../../types/movies';
import { CategoryType, MoviesListType } from '../../types/configuration';
import { useCategory } from '../../context/CategoryContext';

const initialMovieList = {
  results: [],
  page: 1,
  total_pages: 0,
  total_results: 0,
};

const Home: React.FC = () => {
  const { setSelectedCategory } = useCategory();
  const [loading, setLoading] = useState(true);
  const [trendingPeriod, setTrendingPeriod] = useState<'trending_day' | 'trending_week'>('trending_day');
  const [popularMovies,setPopularMovies] = useState<MoviesListResponse>(initialMovieList);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<MoviesListResponse>(initialMovieList);
  const [topRatedMovies, setTopRatedMovies] = useState<MoviesListResponse>(initialMovieList);
  const [trendingMovies, setTrendingMovies] = useState<MoviesListResponse>(initialMovieList);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true);

        // Fetch all movie lists in parallel
        const [popular, nowPlaying, topRated, trending] = await Promise.all([
          fetchMoviesList('popular'),
          fetchMoviesList('now_playing'),
          fetchMoviesList('top_rated'),
          fetchMoviesList(trendingPeriod),
        ]);
        
        // Set the state with the fetched movies
        setPopularMovies(popular);
        setNowPlayingMovies(nowPlaying);
        setTopRatedMovies(topRated);
        setTrendingMovies(trending);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  // Fetch trending movies when the trendingPeriod changes
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setLoading(true);
        const trending = await fetchMoviesList(trendingPeriod);
        setTrendingMovies(trending);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, [trendingPeriod]);

  const handleCardClick = (category: CategoryType | null) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="main-content">
      <h1 className="main-title">Welcome to MovieHub</h1>
      <p className="main-description">
        Discover the latest movies, watch trailers, and find your next favorite film.
      </p>
      <section className="trending-movies">
        <h2 className="category">Trending Movies</h2>
        <div className="trending-switch">
          <label className="switch">
            <input
              type="checkbox"
              checked={trendingPeriod === 'trending_week'}
              onChange={() =>
                setTrendingPeriod(trendingPeriod === 'trending_day' ? 'trending_week' : 'trending_day')
              }
            />
            <span className="slider">
              <span className={`option ${trendingPeriod === 'trending_day' ? 'active' : ''}`}>Day</span>
              <span className={`option ${trendingPeriod === 'trending_week' ? 'active' : ''}`}>Week</span>
            </span>
          </label>
        </div>
        <Carousel movies={trendingMovies} onCardClick={() => handleCardClick('Trending')} />
      </section>
      <section className="popular-movies">
        <h2 className="category">Popular Movies</h2>
        <Carousel movies={popularMovies} onCardClick={() => handleCardClick('Popular')} />
      </section>
      <section className="now-playing-movies">
        <h2 className="category">Now Playing</h2>
        <Carousel movies={nowPlayingMovies} onCardClick={() => handleCardClick('Now Playing')} />
      </section>
      <section className="top-rated-movies">
        <h2 className="category">Top Rated</h2>
        <Carousel movies={topRatedMovies} onCardClick={() => handleCardClick('Top Rated')} />
      </section>
    </main>
  );
};

export default Home;