import React from 'react';
import { CategoryProvider } from './context/CategoryContext';
import Header from './components/header/Header';

const App = ({ children }: { children?: React.ReactNode }) => {
  return (
    <CategoryProvider>
      <Header />
      <main>{children}</main>
      <footer className="footer">
        <p>&copy; 2023 Movie App</p>
      </footer>
    </CategoryProvider>
  );
};

export default App;
