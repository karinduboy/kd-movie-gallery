import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Card from '../components/card/Card';
import { Category } from '../types/configuration';
import { MockCategoryProvider } from './mocks/MockCategoryProvider';
import { MockWishlistProvider, addToWishlistMock, removeFromWishlistMock } from './mocks/MockWishlistProvider';


// Mock the navigate function from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Card Component', () => {
  const mockMovie = {
    id: 1,
    poster_path: '/path/to/poster.jpg',
    title: 'Test Movie',
    category: Category.POPULAR,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the card with the correct movie title and poster', () => {
    render(
      <BrowserRouter>
        <MockWishlistProvider>
          <MockCategoryProvider>
            <Card {...mockMovie} />
          </MockCategoryProvider>
          </MockWishlistProvider>
      </BrowserRouter>
    );

    // Check if the movie title is rendered
    const posterImage = screen.getByAltText(mockMovie.title);
    expect(posterImage).toBeInTheDocument();

    // Check if the poster image is rendered
    expect(screen.getByAltText(mockMovie.title)).toHaveAttribute('src', mockMovie.poster_path);
  });

  it('adds the movie to the wishlist when the wishlist icon is clicked', () => {

    render(
      <BrowserRouter>
        <MockWishlistProvider wishlist={[]}>
          <MockCategoryProvider>
            <Card {...mockMovie} />
          </MockCategoryProvider>
        </MockWishlistProvider>
      </BrowserRouter>
    );

    // Click the wishlist icon
    const wishlistIcon = screen.getByTestId('wishlist-icon');
    fireEvent.click(wishlistIcon);
    expect(addToWishlistMock).toBeCalled();
    expect(removeFromWishlistMock).not.toBeCalled();
  });

  it('removes the movie from the wishlist when the wishlist icon is clicked', () => {

    render(
      <BrowserRouter>
        <MockWishlistProvider wishlist={[mockMovie]}>
          <MockCategoryProvider>
            <Card {...mockMovie} />
          </MockCategoryProvider>
        </MockWishlistProvider>
      </BrowserRouter>
    );

    // Click the wishlist icon
    const wishlistIcon = screen.getByTestId('wishlist-icon');
    fireEvent.click(wishlistIcon);
    expect(removeFromWishlistMock).toBeCalledWith(mockMovie.id);
    expect(addToWishlistMock).not.toBeCalled();
  });

  it('navigates to the movie details page when the card is clicked', () => {
    render(
      <BrowserRouter>
        <MockWishlistProvider>
          <MockCategoryProvider>
            <Card {...mockMovie} />
          </MockCategoryProvider>
        </MockWishlistProvider>
      </BrowserRouter>
    );

    // Click the card
    const cardContainer = screen.getByTestId('card-container');
    fireEvent.click(cardContainer);

    // Check if the navigate function is called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith(`/details/${mockMovie.id}`);
  });
});