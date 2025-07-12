import React from 'react';
import Header from './components/header/Header';

const App = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer className="footer">
        <p>&copy; 2023 Movie App</p>
      </footer>
    </>
  );
};

export default App;
