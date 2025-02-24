import { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { useQuery } from '@tanstack/react-query';
import { GetRecipes } from '../lib/api';
import toast from 'react-hot-toast';
import { Clock, Filter } from 'lucide-react';
import Loader from '../components/Loader';

interface Recipe {
  id: number;
  title: string;
  image_url: string;
  rating: number;
  duration: number;
  difficulty: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}

function Recipes() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('all');

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['recipes'],
    queryFn: GetRecipes,
  })

  if (isPending) 
    return <Loader />

  if (isError)
    return toast.error(error.message)

  const timeRanges = [
    { label: 'All', value: 'all' },
    { label: 'Quick (< 30 mins)', value: 'quick' },
    { label: 'Medium (30-45 mins)', value: 'medium' },
    { label: 'Long (> 45 mins)', value: 'long' },
  ];

  const filteredRecipes = data.filter((recipe: Recipe) => {
    switch (selectedTimeRange) {
      case 'quick':
        return recipe.duration < 30;
      case 'medium':
        return recipe.duration >= 30 && recipe.duration <= 45;
      case 'long':
        return recipe.duration > 45;
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl py-12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Recipes</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our collection of delicious recipes, carefully crafted and tested for your cooking pleasure.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="relative inline-flex items-center">
              <Clock className="absolute left-3 h-5 w-5 text-gray-400" />
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="pl-10 pr-10 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {timeRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {filteredRecipes.length == 0 ? (
          <div className="text-center py-12">
            <Filter className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No recipes found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your filters to find more recipes.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredRecipes.map((recipe: Recipe) => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                image={recipe.image_url}
                rating={recipe.rating}
                cookTime={recipe.duration}
                difficulty={recipe.difficulty}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Recipes;