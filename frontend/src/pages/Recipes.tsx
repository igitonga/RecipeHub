import RecipeCard from '../components/RecipeCard';
import { useQuery } from '@tanstack/react-query';
import { GetRecipes } from '../lib/api';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

const recipes = [
  {
    id: 1,
    title: "Creamy Tuscan Pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    cookTime: "30 mins",
    difficulty: "Easy"
  },
  {
    id: 2,
    title: "Grilled Salmon Bowl",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800",
    rating: 4.6,
    cookTime: "25 mins",
    difficulty: "Medium"
  },
  {
    id: 3,
    title: "Mediterranean Quinoa Salad",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    rating: 4.5,
    cookTime: "20 mins",
    difficulty: "Easy"
  },
  {
    id: 4,
    title: "Spicy Thai Curry",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    cookTime: "45 mins",
    difficulty: "Hard"
  },
  {
    id: 5,
    title: "Classic Beef Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
    cookTime: "35 mins",
    difficulty: "Medium"
  }
];

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
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['recipes'],
    queryFn: GetRecipes,
  })

  if (isPending) 
    return <Loader />

  if (isError)
    return toast.error(error.message)

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl py-12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Recipes</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our collection of delicious recipes, carefully crafted and tested for your cooking pleasure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data.map((recipe: Recipe) => (
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
      </div>
    </div>
  );
}

export default Recipes;