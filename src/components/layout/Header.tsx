import React from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <button
              onClick={onMenuClick}
              className="inline-flex items-center px-3 py-2 text-gray-400 hover:text-gray-500 lg:hidden"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <div className="flex flex-shrink-0 items-center">
              <Link to="/" className="text-xl font-bold text-gray-800">
                Workout Tracker
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <UserCircleIcon className="h-8 w-8 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};