import React, { createContext, useContext, useState } from 'react';
import { CategoryType } from '../types/configuration';

interface CategoryContextProps {
  selectedCategory: CategoryType | null;
  setSelectedCategory: (category: CategoryType | null) => void;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};
