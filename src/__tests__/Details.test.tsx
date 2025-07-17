import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Details from '../pages/details/Details';
import { fetchMovieDetails, fetchMovieCast } from '../utils/tmdbApi';
import { transformMovieDetails } from '../utils/dataTransform';
import { MockWishlistProvider, addToWishlistMock, removeFromWishlistMock } from './mocks/MockWishlistProvider';
import { MockCategoryProvider, setSelectedCategoryMock } from './mocks/MockCategoryProvider';
import { Category } from '../types/configuration';


// Mock the API calls
vi.mock('../utils/tmdbApi', () => ({
  fetchMovieDetails: vi.fn(),
  fetchMovieCast: vi.fn(),
}));

const movieDetails = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/test-poster.jpg',
  vote_average: 8.5,
  release_date: '2023-01-01',
  runtime: 120,
  genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Adventure' }],
  overview: 'This is a test movie overview.',
  adult: false,
  backdrop_path: '',
  budget: 0,
  origin_country: [],
  original_language: '',
  original_title: '',
  popularity: 0,
  production_companies: [],
  production_countries: [],
  revenue: 0,
  spoken_languages: [],
  status: '',
  tagline: '',
  video: false,
  vote_count: 0
  }

describe('Details Component', () => {
  const mockMovie = {...movieDetails, ...transformMovieDetails(movieDetails)};

  const mockCast = [
    { id: 1, name: 'Actor 1', character: 'Character 1' },
    { id: 2, name: 'Actor 2', character: 'Character 2' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the loading state', () => {
    render(
      <BrowserRouter>
          <MockWishlistProvider>
            <MockCategoryProvider>
              <Details />
            </MockCategoryProvider>
          </MockWishlistProvider>
        </BrowserRouter>
    );

    // Check if the loading message is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders "Movie not found" when no movie is available', async () => {
    (fetchMovieDetails as vi.Mock).mockResolvedValue(null);
    (fetchMovieCast as vi.Mock).mockResolvedValue([]);

    render(
      <BrowserRouter>
        <MockWishlistProvider>
          <MockCategoryProvider>
            <Details />
          </MockCategoryProvider>
        </MockWishlistProvider>
      </BrowserRouter>
    );

    // Wait for the loading state to finish
    await waitFor(() => {
      expect(screen.getByText('Movie not found')).toBeInTheDocument();
    });
  });

  it('renders movie details when data is available', async () => {
    const testMovie= {...mockMovie};

    (fetchMovieDetails as vi.Mock).mockResolvedValue(mockMovie);
    (fetchMovieCast as vi.Mock).mockResolvedValue(mockCast);

    render(
      <BrowserRouter>
        <MockWishlistProvider>
          <MockCategoryProvider>
            <Details />
          </MockCategoryProvider>
        </MockWishlistProvider>
      </BrowserRouter>
    );

    // Wait for the movie details to load
    await waitFor(() => {
      expect(screen.getByText(testMovie.title)).toBeInTheDocument();
      expect(screen.getByText('Rating:')).toBeInTheDocument();
      expect(screen.getAllByRole('img', { name: "rating-star" })).length.not.toBe(0); 
      expect(screen.getByText(`Release Date: ${testMovie.release_date}`)).toBeInTheDocument();
      expect(screen.getByText(`Runtime: ${testMovie.runtime} minutes`)).toBeInTheDocument();
      expect(screen.getByText(testMovie.genres[0].name)).toBeInTheDocument();
      expect(screen.getByText(testMovie.overview)).toBeInTheDocument();
    });
  });

  it('adds the movie to the wishlist when the wishlist icon is clicked', async () => {
    const testMovie = {...mockMovie};

    (fetchMovieDetails as vi.Mock).mockResolvedValue(mockMovie);
    (fetchMovieCast as vi.Mock).mockResolvedValue(mockCast);

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={
            <MockWishlistProvider wishlist={[]}>
              <MockCategoryProvider>
                <Details />
              </MockCategoryProvider>
            </MockWishlistProvider>
          } />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    // Wait for the movie details to load
    await screen.getByText(testMovie.title);
    
    // Click the wishlist icon to add the movie
    const wishlistIcon = screen.getByTestId('wishlist-icon-details');
    fireEvent.click(wishlistIcon);
    // Check if addToWishlist is called
    await waitFor(() => {
      expect(addToWishlistMock).toBeCalled();
      expect(removeFromWishlistMock).not.toBeCalled();
    });
  });

  it('removes the movie to the wishlist when the wishlist icon is clicked', async () => {
    const testMovie = {...mockMovie};
    const mockCast = [
      { id: 1, name: 'Actor 1', character: 'Character 1' },
      { id: 2, name: 'Actor 2', character: 'Character 2' },
    ];

    (fetchMovieDetails as vi.Mock).mockResolvedValue(mockMovie);
    (fetchMovieCast as vi.Mock).mockResolvedValue(mockCast);
    
    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={
            <MockWishlistProvider wishlist={[{id: 1, title: testMovie.title, poster_path: testMovie.poster_path}]}>
              <MockCategoryProvider>
                <Details />
              </MockCategoryProvider>
            </MockWishlistProvider>
          } />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    // Wait for the movie details to load
    await screen.getByText(testMovie.title);
    
    // Click the wishlist icon to add the movie
    const wishlistIcon = screen.getByTestId('wishlist-icon-details');
    fireEvent.click(wishlistIcon);
    
    // Check if removeFromWishlist is called
    await waitFor(() => {
      expect(removeFromWishlistMock).toBeCalledWith(mockMovie.id);
      expect(addToWishlistMock).not.toBeCalled();
    });
  });

  it('renders the cast list', async () => {
    const mockCast = [
      { id: 1, name: 'Actor 1', character: 'Character 1' },
      { id: 2, name: 'Actor 2', character: 'Character 2' },
    ];

    (fetchMovieDetails as vi.Mock).mockResolvedValue(mockMovie);
    (fetchMovieCast as vi.Mock).mockResolvedValue(mockCast);

    render(
      <BrowserRouter>
        <MockWishlistProvider>
          <MockCategoryProvider>
            <Details />
          </MockCategoryProvider>
        </MockWishlistProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    
    // Wait for the movie details to load
    await screen.getByText(mockMovie.title);
    // Wait for the cast list to load
    await screen.getByTestId('movie-cast');

    await waitFor(() => {
      const  castItems = screen.getAllByTestId('cast-item');
      expect(castItems).toHaveLength(mockCast.length);
    });
  });
});
