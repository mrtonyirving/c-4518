
import React from 'react';

const Header = () => {
  return (
    <header className="w-full py-6 border-b border-gdpr-border/30">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-gdpr-primary to-gdpr-secondary flex items-center justify-center">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <h1 className="text-2xl font-bold text-gdpr-text flex flex-col">
            <span>GDPR Knowledge</span>
            <span className="text-gradient">Graph Explorer</span>
          </h1>
        </div>
        
        <nav aria-label="Main Navigation">
          <ul className="flex items-center gap-6">
            <li>
              <a href="#about" className="text-gdpr-muted hover:text-gdpr-accent transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="text-gdpr-muted hover:text-gdpr-accent transition-colors">
                How It Works
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gdpr-muted hover:text-gdpr-accent transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
