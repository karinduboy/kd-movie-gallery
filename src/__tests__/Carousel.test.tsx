import { render, screen, fireEvent } from '@testing-library/react';
import Carousel from '../components/carousel/Carousel';
import { vi } from 'vitest';
import { Category } from '../types/configuration';
import { WishlistProvider } from '../context/WishlistContext';
import { CategoryProvider } from '../context/CategoryContext'; 
import * as WishlistContext from '../context/WishlistContext';
import * as CategoryContext from '../context/CategoryContext';
import { BrowserRouter } from 'react-router-dom';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Carousel Component', () => {
  const mockMovies = {
    results: [
      { id: 1, poster_path: '/poster1.jpg', title: 'Movie 1' },
      { id: 2, poster_path: '/poster2.jpg', title: 'Movie 2' },
    ],
  };

  it('renders the skeleton loader while loading', () => {
    const mockCategory = Category.POPULAR
    render(<Carousel movies={{ results: [] }} onCardClick={vi.fn()} loading={true} category={mockCategory}/>);

    // Check if the skeleton loader is rendered
    const skeletonContainer = screen.getByTestId(`${mockCategory}-skeleton-container`);
    const skeletonCards = document.getElementsByClassName('skeleton-card');
    expect(skeletonCards).toHaveLength(5);
  });

  it('displays "No movies available" when there are no movies', () => {
    render(<Carousel movies={{ results: [] }} onCardClick={vi.fn()} loading={false} />);

    // Check if the "No movies available" message is displayed
    expect(screen.getByText('No movies available')).toBeInTheDocument();
  });

  it('renders the correct number of movie cards', () => {
    render(
      <BrowserRouter>
        <WishlistProvider>
          <CategoryProvider>
            <Carousel movies={mockMovies} onCardClick={vi.fn()} loading={false} />
          </CategoryProvider>
        </WishlistProvider>
      </BrowserRouter>
    );

    // Check if the correct number of movie cards are rendered
    const movieCards = screen.getAllByTestId('carousel-card');
    expect(movieCards).toHaveLength(mockMovies.results.length);
  });
});