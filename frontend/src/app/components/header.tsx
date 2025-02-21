import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '../context/authContext';

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <header className="w-full bg-gradient-to-r from-purple-100 to-purple-300 transition-colors duration-500 shadow p-4 flex items-center justify-between ">
      <div className="flex items-center space-x-4 text-xl font-bold text-black ">
        <Link href="/" className='hover:no-underline'>E-Store</Link>
        <Link href="/cart" className="text-gray-700 hover:text-indigo-600">
          <Image src="/cart.svg" height="20" width="20" alt="cartLogo" />
          </Link>
      </div>
      <nav className="flex items-center space-x-4 ">
        <Link href="/" className="text-gray-700 hover:text-indigo-600 hover:no-underline">
          Home
        </Link>
        <Link href="/products/" className="text-gray-700 hover:text-indigo-600 hover:no-underline">
          Products
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
            <Link href="/auth/login" className="text-gray-700 hover:text-indigo-600 hover:no-underline">
              Login
            </Link>
            <Link href="/auth/register" className="text-gray-700 hover:text-indigo-600 hover:no-underline">
              Register
            </Link>
          </>
        )}

      </nav>
    </header>
  );
};

export default Header;
