// tests/mocks/MockCategoryProvider.tsx
import { ReactNode } from 'react'
import { CategoryProvider } from '../../context/CategoryContext'
import { vi } from 'vitest'
import { Category } from '../../types/configuration'

export const setSelectedCategoryMock = vi.fn()

export const MockCategoryProvider = ({
  children,
  selectedCategory = null,
}: {
  children: ReactNode
  selectedCategory?: Category | null
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
