// tests/mocks/MockWishlistProvider.tsx
import { ReactNode } from 'react'
import { WishlistContext } from '../../context/WishlistContext'
import { vi } from 'vitest'
import { WishListMovie } from '../../types/movies'

export const addToWishlistMock = vi.fn()
export const removeFromWishlistMock = vi.fn()

export const MockWishlistProvider = ({
  children,
  wishlist = [],
}: {
  children: ReactNode
  wishlist?: WishListMovie[]
}) => {
  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist: addToWishlistMock,
        removeFromWishlist: removeFromWishlistMock,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}
