import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../context/authContext';

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <header className="w-full bg-white shadow p-4 flex items-center justify-between">
      <div className="text-xl font-bold">
        <Link href="/">E-Store</Link>
      </div>
      <nav className="flex items-center space-x-4">
        <Link href="/" className="text-gray-700 hover:text-indigo-600">
          Home
        </Link>
        {isLoggedIn ? (
          <button
            onClick={logout}
            className="text-gray-700 hover:text-red-600"
          >
            Logout
          </button>
        ) : (
          <>
            <Link href="/auth/login" className="text-gray-700 hover:text-indigo-600">
              Login
            </Link>
            <Link href="/auth/register" className="text-gray-700 hover:text-indigo-600">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
