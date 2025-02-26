
import { useState } from 'react';
import { Menu, X, ChefHat, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <ChefHat className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">RecipeHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium ${
                isActive('/') ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/recipes"
              className={`px-3 py-2 text-sm font-medium ${
                isActive('/recipes') ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'
              }`}
            >
              Recipes
            </Link>
            <Link
              to="/add/recipe"
              className={`px-3 py-2 text-sm font-medium ${
                isActive('/add/recipe') ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'
              }`}
            >
              Add Recipe
            </Link>
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="cursor-pointer inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            ) : (
              <Link
                to="/signin"
                className="cursor-pointer inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/') ? 'text-indigo-600 bg-gray-50' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>
              <Link
                to="/recipes"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/recipes') ? 'text-indigo-600 bg-gray-50' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                Recipes
              </Link>
              <Link
                to="/add/recipe"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/add/recipe') ? 'text-indigo-600 bg-gray-50' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                Add Recipe
              </Link>
              <Link
                to="/about"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/about') ? 'text-indigo-600 bg-gray-50' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                About
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <div className="flex items-center">
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                  </div>
                </button>
              ) : (
                <Link
                  to="/signin"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;