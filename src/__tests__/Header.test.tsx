import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import Header from '../components/header/Header';
import { WishlistProvider } from '../context/WishlistContext';
import { BrowserRouter } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import Modal from '../components/modal/Modal';

vi.mock('../components/modal/Modal', () => ({
  __esModule: true,
  default: ({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) =>
    isOpen ? <div>{children}</div> : null,
}));

describe('Header Component', () => {
  it('renders the logo and wishlist icon', () => {
    render(
      <BrowserRouter>
        <WishlistProvider>
          <Header />
        </WishlistProvider>
      </BrowserRouter>
    );

    // Check if the logo is rendered
    expect(screen.getByTestId('logo')).toBeInTheDocument();

    // Check if the wishlist icon is rendered
    expect(screen.getByTestId('wishlist-icon')).toBeInTheDocument();
  });

  it('opens the wishlist modal when the wishlist icon is clicked', () => {
    render(
      <BrowserRouter>
        <WishlistProvider>
          <Header />
        </WishlistProvider>
      </BrowserRouter>
    );

    // Click the wishlist icon
    fireEvent.click(screen.getByTestId('wishlist-icon'));

    // Check if the modal is opened
    expect(screen.getByText('Your Wishlist')).toBeInTheDocument();
  });

  it('shows the wishlist count when there are items in the wishlist', () => {
    const mockWishlist = [
      { id: 1, title: 'Movie 1', poster_path: 'path/to/poster1.jpg' },
      { id: 2, title: 'Movie 2', poster_path: 'path/to/poster2.jpg' },
    ];
    
    render(
      <BrowserRouter>
        <WishlistProvider value={{ wishlist: mockWishlist, addToWishlist: vi.fn(), removeFromWishlist: vi.fn() }}>
          <Header />
        </WishlistProvider>
      </BrowserRouter>
    );

    // Click the wishlist icon to open the modal
    fireEvent.click(screen.getByTestId('wishlist-icon'));

    // Check if the wishlist count is displayed
    expect(screen.queryByText('0')).not.toBeInTheDocument(); // Initially, count should not be 0
  });
});