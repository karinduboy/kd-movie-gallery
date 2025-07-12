import React from 'react';
import './home.scss';

const Home: React.FC = () => {
    return (
        <main className="main-content">
            <section className="top-movies">
                <h2 className='category'>Top Movies</h2>
                <div className="movie-list">
                    {/* Movie items will go here */}
                </div>
            </section>
            <section className="popular-movies">
                <h2 className='category'>Popular Movies</h2>
                <div className="movies-list">
                    {/* Movies items will go here */}
                </div>
            </section>
            <section className="latest-movies">
                <h2 className='category'>Latest Movies</h2>
                <div className="movies-list">
                    {/* Movies items will go here */}
                </div>
            </section>
        </main>
    );
};

export default Home;