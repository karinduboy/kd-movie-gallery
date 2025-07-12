import React from 'react';
import Carousel from '../../components/carousel/Carousel';
import './home.scss';

const movies = [
    {
      movieId: 1,
      movieImg: 'https://via.placeholder.com/300x450',
      isFavorite: true,
      movieTitle: 'Inception',
    },
    {
      movieId: 2,
      movieImg: 'https://via.placeholder.com/300x450',
      isFavorite: false,
      movieTitle: 'Interstellar',
    },
    {
      movieId: 3,
      movieImg: 'https://via.placeholder.com/300x450',
      isFavorite: true,
      movieTitle: 'The Dark Knight',
    },
    {
        movieId: 1,
        movieImg: 'https://via.placeholder.com/300x450',
        isFavorite: true,
        movieTitle: 'Inception',
      },
      {
        movieId: 2,
        movieImg: 'https://via.placeholder.com/300x450',
        isFavorite: false,
        movieTitle: 'Interstellar',
      },
      {
        movieId: 3,
        movieImg: 'https://via.placeholder.com/300x450',
        isFavorite: true,
        movieTitle: 'The Dark Knight',
      },{
        movieId: 1,
        movieImg: 'https://via.placeholder.com/300x450',
        isFavorite: true,
        movieTitle: 'Inception',
      },
      {
        movieId: 2,
        movieImg: 'https://via.placeholder.com/300x450',
        isFavorite: false,
        movieTitle: 'Interstellar',
      },
      {
        movieId: 3,
        movieImg: 'https://via.placeholder.com/300x450',
        isFavorite: true,
        movieTitle: 'The Dark Knight',
      },{
        movieId: 1,
        movieImg: 'https://via.placeholder.com/300x450',
        isFavorite: true,
        movieTitle: 'Inception',
      },
      {
        movieId: 2,
        movieImg: 'https://via.placeholder.com/300x450',
        isFavorite: false,
        movieTitle: 'Interstellar',
      },
      {
        movieId: 3,
        movieImg: 'https://via.placeholder.com/300x450',
        isFavorite: true,
        movieTitle: 'The Dark Knight',
      },
  ];

const Home: React.FC = () => {
    // This component will render the main content of the home page
    return (
        <main className="main-content">
            <section className="top-movies">
                <h2 className='category'>Top Movies</h2>
                <div className="movie-list">
                    <Carousel movies={movies} />
                </div>
            </section>
            <section className="popular-movies">
                <h2 className='category'>Popular Movies</h2>
                <div className="movies-list">
                    <Carousel movies={movies} />
                </div>
            </section>
            <section className="latest-movies">
                <h2 className='category'>Latest Movies</h2>
                <div className="movies-list">
                    <Carousel movies={movies} />
                </div>
            </section>
        </main>
    );
};

export default Home;