import React, { useEffect, useState } from 'react';
import Carousel from '../../components/carousel/Carousel';
import { fetchMoviesList } from '../../utils/tmdbApi';
import './home.scss';
import { MoviesListResponse } from '../../types/movies';
import { Category, MoviesList, TrendingPeriod } from '../../types/configuration';
import { useCategory } from '../../context/CategoryContext';

const initialMovieList = {
  results: [],
  page: 1,
  total_pages: 0,
  total_results: 0,
};

const Home: React.FC = () => {
  // const { setSelectedCategory } = useCategory();
  const [loading, setLoading] = useState(true);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [trendingPeriod, setTrendingPeriod] = useState<TrendingPeriod>(TrendingPeriod.Day);
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
          fetchMoviesList(MoviesList.Popular),
          fetchMoviesList(MoviesList.NowPlaying),
          fetchMoviesList(MoviesList.TopRated),
          fetchMoviesList(MoviesList[trendingPeriod]),
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
        setTrendingLoading(true);
        const trending = await fetchMoviesList(MoviesList[trendingPeriod]);
        setTrendingMovies(trending);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      } finally {
        setTrendingLoading(false);
      }
    };

    fetchTrendingMovies();
  }, [trendingPeriod]);

  // const handleCardClick = (category: Category) => {
  //   setSelectedCategory(category);
  // }; 

  return (
    <main className="main-content">
      <h1 className="main-title">Welcome to KD Movie Gallery</h1>
      <p className="main-description">
        Discover the movies that are rocking the screens.
      </p>
      <section className="trending-movies">
        <h2 className="category">Trending Movies</h2>
        <div className="trending-switch">
          <label className="switch">
            <input
              type="checkbox"
              checked={trendingPeriod === TrendingPeriod.Week}
              onChange={() =>
                setTrendingPeriod(trendingPeriod === TrendingPeriod.Day ? TrendingPeriod.Week : TrendingPeriod.Day)
              }
            />
            <span className="slider">
              <span className={`option ${trendingPeriod === TrendingPeriod.Day ? 'active' : ''}`}>Day</span>
              <span className={`option ${trendingPeriod === TrendingPeriod.Week ? 'active' : ''}`}>Week</span>
            </span>
          </label>
        </div>
        <Carousel movies={trendingMovies} loading={loading || trendingLoading} category={Category.TRENDING}/>
      </section>
      <section className="popular-movies">
        <h2 className="category">Popular Movies</h2>
        <Carousel movies={popularMovies} loading={loading} category={Category.POPULAR}/>
      </section>
      <section className="now-playing-movies">
        <h2 className="category">Now Playing</h2>
        <Carousel movies={nowPlayingMovies} loading={loading} category={Category.NOW_PLAYING}/>
      </section>
      <section className="top-rated-movies">
        <h2 className="category">Top Rated</h2>
        <Carousel movies={topRatedMovies} loading={loading} category={Category.TOP_RATED}/>
      </section>
    </main>
  );
};

export default Home;