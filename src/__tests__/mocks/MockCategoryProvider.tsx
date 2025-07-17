// tests/mocks/MockCategoryProvider.tsx
import { ReactNode } from 'react'
import { CategoryProvider } from '../../context/CategoryContext'
import { vi } from 'vitest'

export const setSelectedCategoryMock = vi.fn()

export const MockCategoryProvider = ({
  children,
  selectedCategory = '',
}: {
  children: ReactNode
  selectedCategory?: string
}) => {
  return (
    <CategoryProvider
      value={{
        selectedCategory,
        setSelectedCategory: setSelectedCategoryMock,
      }}
    >
      {children}
    </CategoryProvider>
  )
}
