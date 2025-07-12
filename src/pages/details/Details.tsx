import React from 'react';
import './Details.scss';

const Details: React.FC = () => {
    const movie = {
        title: 'Movie Title',
        description: 'This is a brief description of the movie.',
        additionalInfo: 'Additional movie information goes here.',
        imageUrl: 'https://placehold.co/900x600', // Replace with actual image URL
    };

    return (
        <div className="details-container">
            <div className="details-content">
                <div className="image-placeholder">
                    <img
                        src={movie.imageUrl}
                        alt={movie.title}
                        className="movie-image"
                    />
                </div>
                <div className="movie-info">
                    <button className="wishlist-button">Add to Wishlist</button>
                    <div>
                        <h2>{movie.title}</h2>
                        <p>{movie.description}</p>
                    </div>
                </div>
            </div>
            <section className="additional-info">
                <h3>Additional Information</h3>
                <p>{movie.additionalInfo}</p>
            </section>
        </div>
    );
};

export default Details;
