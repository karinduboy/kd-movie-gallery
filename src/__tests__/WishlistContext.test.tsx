import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Cookies from 'js-cookie';
import { WishlistProvider, useWishlist } from '../context/WishlistContext';
import userEvent from '@testing-library/user-event';

// Mock Cookies
vi.mock('js-cookie', () => {
  const originalModule = vi.importActual('js-cookie');
  return {
    ...originalModule,
    default: {
      get: vi.fn(),
      set: vi.fn(),
    },
  };
});

// Test component to consume the context
const TestComponent = () => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  return (
    <div>
      <p data-testid="wishlist-count">Wishlist Count: {wishlist.length}</p>
      <button
        onClick={() => addToWishlist({ id: 1, title: 'Test Movie', poster_path: '/test.jpg' })}
        data-testid="add-to-wishlist"
      >
        Add to Wishlist
      </button>
      <button onClick={() => removeFromWishlist(1)} data-testid="remove-from-wishlist">
        Remove from Wishlist
      </button>
    </div>
  );
};

describe('WishlistContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes the wishlist from cookies', () => {
    // Mock the cookie value
    (Cookies.get as vi.Mock).mockReturnValue(
      JSON.stringify([{ id: 1, title: 'Test Movie', poster_path: '/test.jpg' }])
    );

    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    );

    // Check if the wishlist is initialized from cookies
    expect(screen.getByTestId('wishlist-count').textContent).toBe('Wishlist Count: 1');
  });

  it('adds a movie to the wishlist', async () => {
    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    );

    const addButton = screen.getByTestId('add-to-wishlist');
    const wishlistCount = screen.getByTestId('wishlist-count');

    // Add a movie to the wishlist
    await userEvent.click(addButton);

    // Check if the movie is added
    expect(wishlistCount.textContent).toBe('Wishlist Count: 1');

    // Check if the cookie is updated
    expect(Cookies.set).toHaveBeenCalledWith(
      'wishlist',
      JSON.stringify([{ id: 1, title: 'Test Movie', poster_path: '/test.jpg' }]),
      { expires: 7, path: '/' }
    );
  });

  it('removes a movie from the wishlist', async () => {
    // Mock the cookie value
    (Cookies.get as vi.Mock).mockReturnValue(
      JSON.stringify([{ id: 1, title: 'Test Movie', poster_path: '/test.jpg' }])
    );

    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    );

    const removeButton = screen.getByTestId('remove-from-wishlist');
    const wishlistCount = screen.getByTestId('wishlist-count');

    // Remove a movie from the wishlist
    await userEvent.click(removeButton);

    // Check if the movie is removed
    expect(wishlistCount.textContent).toBe('Wishlist Count: 0');

    // Check if the cookie is updated
    expect(Cookies.set).toHaveBeenCalledWith('wishlist', JSON.stringify([]), { expires: 7, path: '/' });
  });
});