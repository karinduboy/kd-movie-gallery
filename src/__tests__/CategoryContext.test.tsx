import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { CategoryProvider, useCategory } from '../context/CategoryContext';
import { Category } from '../types/configuration';
import userEvent from '@testing-library/user-event';

// Test component to consume the context
const TestComponent = () => {
  const { selectedCategory, setSelectedCategory } = useCategory();

  return (
    <div>
      <p data-testid="selected-category">{selectedCategory || 'No category selected'}</p>
      <button onClick={() => setSelectedCategory(Category.POPULAR)} data-testid="set-category-button">
        Set Popular Category
      </button>
      <button onClick={() => setSelectedCategory(null)} data-testid="clear-category-button">
        Clear Category
      </button>
    </div>
  );
};

describe('CategoryContext', () => {
  it('provides the default value when no category is selected', () => {
    render(
      <CategoryProvider>
        <TestComponent />
      </CategoryProvider>
    );

    // Check the default value
    expect(screen.getByTestId('selected-category').textContent).toBe('No category selected');
  });

  it('updates the selected category when setSelectedCategory is called', async () => {
    render(
      <CategoryProvider>
        <TestComponent />
      </CategoryProvider>
    );

    const setCategoryButton = screen.getByTestId('set-category-button');
    const selectedCategory = screen.getByTestId('selected-category');

    // Click the button to set the category
    await userEvent.click(setCategoryButton);

    // Check if the category is updated
    expect(selectedCategory.textContent).toBe(Category.POPULAR);
  });

  it('clears the selected category when setSelectedCategory is called with null', async () => {
    render(
      <CategoryProvider>
        <TestComponent />
      </CategoryProvider>
    );

    const setCategoryButton = screen.getByTestId('set-category-button');
    const clearCategoryButton = screen.getByTestId('clear-category-button');
    const selectedCategory = screen.getByTestId('selected-category');

    // Set the category first
    await userEvent.click(setCategoryButton);
    expect(selectedCategory.textContent).toBe(Category.POPULAR);

    // Clear the category
    await userEvent.click(clearCategoryButton);
    expect(selectedCategory.textContent).toBe('No category selected');
  });

  it('throws an error when useCategory is used outside of CategoryProvider', () => {
    // Mock console.error to suppress the error output in the test
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      'useCategory must be used within a CategoryProvider'
    );

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });
});