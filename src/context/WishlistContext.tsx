import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { MovieInformation } from '../types/movies';

type WhishListMovie = Pick<MovieInformation, 'id' | 'title' | 'poster_path'>;

interface WishlistContextProps {
  wishlist: WhishListMovie[];
  addToWishlist: (movie: WhishListMovie) => void;
  removeFromWishlist: (movieId: number) => void;
}


const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WhishListMovie[]>([]);

  // Load wishlist from cookies on initial render
  useEffect(() => {
    const storedWishlist = Cookies.get('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  // Save wishlist to cookies whenever it changes
  useEffect(() => {
    Cookies.set('wishlist', JSON.stringify(wishlist), { expires: 7 }); // Expires in 7 days
  }, [wishlist]);

  const addToWishlist = (movie: WhishListMovie) => {
    if (!wishlist.find((item) => item.id === movie.id)) {
      setWishlist([...wishlist, movie]);
    }
  };

  const removeFromWishlist = (id: number) => {
    setWishlist(wishlist.filter((movie) => movie.id !== id));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};