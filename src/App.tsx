import React from 'react';
import { CategoryProvider } from './context/CategoryContext';
import Header from './components/header/Header';
import './App.scss';

const App = ({ children }: { children?: React.ReactNode }) => {
  return (
    <CategoryProvider>
      <Header />
      <main>{children}</main>
      <footer className="footer">
        <p>&copy; 2025 KD Movie DB - Development Project</p>
      </footer>
    </CategoryProvider>
  );
};

export default App;
