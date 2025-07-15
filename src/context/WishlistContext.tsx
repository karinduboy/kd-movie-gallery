import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { WishListMovie } from '../types/movies';
import { parse } from 'path';

interface WishlistContextProps {
  wishlist: WishListMovie[];
  addToWishlist: (movie: WishListMovie) => void;
  removeFromWishlist: (movieId: number) => void;
}


const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishListMovie[]>(() => {
    const storedWishlist = Cookies.get('wishlist');
    console.log('Initializing wishlist from cookies:', storedWishlist);
    return storedWishlist ? (JSON.parse(storedWishlist) as WishListMovie[]) : [];
  });

  // Load wishlist from cookies on initial render
  useEffect(() => {
    console.log('Loading wishlist from cookies', Cookies.get('wishlist'));
    const storedWishlist = Cookies.get('wishlist');
    console.log('Stored wishlist:', storedWishlist);
    const parsedWishlist = storedWishlist ? JSON.parse(storedWishlist) : null;
    if (parsedWishlist) {
      setWishlist(parsedWishlist as WishListMovie[]);
    }
  }, []);

  // Save wishlist to cookies whenever it changes
  useEffect(() => {
    console.log('Updating wishlist to cookies:', wishlist);
    Cookies.set('wishlist', JSON.stringify(wishlist), { expires: 7 , path: '/'}); // Expires in 7 days
  }, [wishlist]);

  const addToWishlist = (movie: WishListMovie) => {
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