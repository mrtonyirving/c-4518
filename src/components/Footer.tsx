
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="w-full py-8 bg-black border-t border-gdpr-border/30">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-gdpr-primary to-gdpr-secondary flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-gdpr-text font-medium">GDPR Knowledge Graph Explorer</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <a href="#about" className="text-gdpr-muted hover:text-gdpr-accent transition-colors text-sm">About</a>
            <a href="#how-it-works" className="text-gdpr-muted hover:text-gdpr-accent transition-colors text-sm">How It Works</a>
            <a href="mailto:contact@example.com" className="text-gdpr-muted hover:text-gdpr-accent transition-colors text-sm">Contact</a>
          </div>
          
          <div className="text-gdpr-muted text-sm">
            © {currentYear} GDPR Knowledge Graph Explorer
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
