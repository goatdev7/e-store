import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-purple-100 to-purple-300 transition-colors duration-500 py-4 text-center text-sm">
      <p>© {new Date().getFullYear()} E-Store. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
