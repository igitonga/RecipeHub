import React from 'react';
import { Star, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecipeCardProps {
  id: number;
  title: string;
  image: string;
  rating: number;
  cookTime: number;
  difficulty: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ id, title, image, rating, cookTime, difficulty }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700 shadow-md">
          {difficulty}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 truncate" title={title}>{title}</h3>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="ml-1 text-gray-600">{rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-1" />
            {cookTime} mins
          </div>
        </div>

        <Link
          to={`/recipe/${id}`}
          className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors duration-200"
        >
          View Recipe
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;