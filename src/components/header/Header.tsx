import React from 'react';
import './header.scss';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logo">Logo</div>
            <div className="wishlist-icon">❤️</div>
        </header>
    );
};

export default Header;
