import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-4 text-center text-sm">
      <p>© {new Date().getFullYear()} E-Store. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
