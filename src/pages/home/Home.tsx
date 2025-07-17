import React, { useEffect, useState } from 'react';
import Carousel from '../../components/carousel/Carousel';
import { fetchMoviesList } from '../../utils/tmdbApi';
import './home.scss';
import { MoviesListResponse } from '../../types/movies';
import { Category, MoviesList, TrendingPeriod } from '../../types/configuration';
import { getMoviesListValueForCategory, getTitleForCategory } from '../../utils/dataTransform';

const initialMovieList = {
  results: [],
  page: 1,
  total_pages: 0,
  total_results: 0,
};

const categories: Category[]= [
  Category.TRENDING,
  Category.POPULAR,
  Category.NOW_PLAYING,
  Category.TOP_RATED,
];

const trendingPeriods = [
  TrendingPeriod.Day,
  TrendingPeriod.Week
]

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [trendingPeriod, setTrendingPeriod] = useState<TrendingPeriod>(TrendingPeriod.Day);
  const [homeMoviesLists, setHomeMoviesLists] = useState<Record<Category, MoviesListResponse>>({
    [Category.TRENDING]: initialMovieList,
    [Category.POPULAR]: initialMovieList,
    [Category.NOW_PLAYING]: initialMovieList,
    [Category.TOP_RATED]: initialMovieList,
  });

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true);

        const fetchsArray = categories.map((cat) => {
          const listString = getMoviesListValueForCategory(cat, trendingPeriod);
          return fetchMoviesList(listString);
        });

        const fetchedMovies = await Promise.all(fetchsArray);
        const fetchedMoviesLists = fetchedMovies.reduce((acc, movies, index) => {
          acc[categories[index]] = movies as MoviesListResponse;
          return acc;
        }, {} as Record<Category, MoviesListResponse>);

        setHomeMoviesLists(fetchedMoviesLists);
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
        const trending = await fetchMoviesList(MoviesList[trendingPeriod])
        setHomeMoviesLists((prevLists) => ({
          ...prevLists,
          [Category.TRENDING]: trending,
        }));

      } catch (error) {
        console.error('Error fetching trending movies:', error);
      } finally {
        setTrendingLoading(false);
      }
    };

    if (trendingPeriod !== TrendingPeriod.Day || homeMoviesLists[Category.TRENDING].results.length === 0) {
      fetchTrendingMovies();
    }
  }, [trendingPeriod]);

  return (
    <main className="main-content" data-testid="home-page-container">
      <h1 className="main-title" data-testid="main-title">Welcome to KD Movie Gallery</h1>
      <p className="main-description" data-testid="main-description">
        Discover the movies that are rocking the screens.
      </p>
      {categories.map((category) => (
        <section key={category} className={`${category.toLowerCase()}-movies`} data-testid={`${category}-movies-section`}>
          <h2 className="category" data-testid={`${category}-movies-title`}>{getTitleForCategory(category)}</h2>
          {category === Category.TRENDING && (
            <div className="trending-switch" data-testid="trending-switch">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={trendingPeriod === TrendingPeriod.Week}
                  onChange={() =>
                    setTrendingPeriod(
                      trendingPeriod === TrendingPeriod.Day ? TrendingPeriod.Week : TrendingPeriod.Day
                    )
                  }
                />
                <span className="slider">
                  <span className={`option ${trendingPeriod === TrendingPeriod.Day ? 'active' : ''}`}>Day</span>
                  <span className={`option ${trendingPeriod === TrendingPeriod.Week ? 'active' : ''}`}>Week</span>
                </span>
              </label>
            </div>
          )}
          {/* Render the Carousel component for each category */}
          <Carousel
            movies={homeMoviesLists[category]}
            loading={loading}
            category={category}
          />
        </section>
      ))}
    </main> 
  )
};

export default Home;