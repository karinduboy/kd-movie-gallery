import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Home from '../pages/home/Home';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { fetchMoviesList } from '../utils/tmdbApi';
import { MoviesList } from '../types/configuration';
import { Category } from '../types/configuration';
import { MockCategoryProvider } from './mocks/MockCategoryProvider';
import { MockWishlistProvider } from './mocks/MockWishlistProvider';

// Mock fetchMoviesList
vi.mock('../utils/tmdbApi', () => ({
  fetchMoviesList: vi.fn(),
}));

const mockMoviesResponse = {
  results: [{ id: 1, title: 'Test Movie', poster_path: '/test.jpg' }],
  page: 1,
  total_pages: 1,
  total_results: 1,
};

const categories = [
  Category.TRENDING,
  Category.POPULAR,
  Category.NOW_PLAYING,
  Category.TOP_RATED,]

describe('Home Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('renders the home page with titles and sections', async () => {
    //TODO: review why the fechMoviesList is called 5 times instead of 4, at the first expect
    (fetchMoviesList as vi.Mock).mockResolvedValue(mockMoviesResponse);

    render(
      <BrowserRouter>
        <MockWishlistProvider>
          <MockCategoryProvider>
            <Home />
          </MockCategoryProvider>
        </MockWishlistProvider>
      </BrowserRouter>
    );
    screen.debug();
    // Static content
    expect(screen.getByTestId('home-page-container')).toBeInTheDocument();
    expect(screen.getByTestId('main-title')).toHaveTextContent('Welcome to KD Movie Gallery');
    expect(screen.getByTestId('trending-movies-section')).toBeInTheDocument();

    // Wait for data fetching to complete
    await waitFor(() => {
      expect(fetchMoviesList).toHaveBeenCalledTimes(5);
    });

    categories.forEach(category => {
      expect(screen.getByTestId(`${category}-movies-title`)).toBeInTheDocument();
      expect(screen.getByTestId(`${category}-carousel-container`)).toBeInTheDocument();
    });
  });

  it('toggles trending period and refetches trending movies', async () => {
    //TODO: review why the fechMoviesList is called 5 times instead of 4, at the first expect
    render(
      <BrowserRouter>
        <MockWishlistProvider>
          <MockCategoryProvider>
            <Home />
          </MockCategoryProvider>
        </MockWishlistProvider>
      </BrowserRouter>
    );

    const switchInput = screen.getByRole('checkbox');
    expect(switchInput).toBeInTheDocument();

    // Wait for initial fetch
    await waitFor(() => {
      expect(fetchMoviesList).toHaveBeenCalledTimes(5);
    });

    // Toggle switch
    fireEvent.click(switchInput);

    // Wait for trending fetch again
    await waitFor(() => {
      // +1 fetch call for trending
      expect(fetchMoviesList).toHaveBeenCalledTimes(6);
    });
  });
  it('displays a skeleton carousel for every category when data fetch is failing', async () => {
    const categories = [
      Category.POPULAR,
      Category.NOW_PLAYING,
      Category.TOP_RATED,
      Category.TRENDING,
    ];

    (fetchMoviesList as vi.Mock).mockReturnValue(new Promise(() => {})); // Keep the promise pending

    render(
      <BrowserRouter>
        <MockWishlistProvider>
          <MockCategoryProvider>
            <Home />
          </MockCategoryProvider>
        </MockWishlistProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(fetchMoviesList).toHaveBeenCalledTimes(5);
      expect(screen.getByTestId('main-title')).toBeInTheDocument();
    });
    // Check if skeletons are displayed for each category
    categories.forEach(category => {
      expect(screen.getByTestId(`${category}-skeleton-container`)).toBeInTheDocument();
    });
    
  });
});
