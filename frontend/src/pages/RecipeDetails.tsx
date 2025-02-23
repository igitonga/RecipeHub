import { useParams } from 'react-router-dom';
import { Clock, Users, ChefHat, Star } from 'lucide-react';
import { GetRecipe } from '../lib/api';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

function RecipeDetails() {
  const { id } = useParams();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['recipe'],
    queryFn: () => GetRecipe(Number(id)),
  })

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return toast.error(error.message)
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Recipe not found</h2>
          <p className="mt-2 text-gray-600">The recipe you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative h-96">
            <img
              src={data.image_url}
              alt={data.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-md flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-medium">{data.rating}</span>
            </div>
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{data.title}</h1>
            
            <div className="flex items-center space-x-8 mb-8">
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                <span>{data.duration} mins</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-5 h-5 mr-2" />
                <span>{2} servings</span>
              </div>
              <div className="flex items-center text-gray-600">
                <ChefHat className="w-5 h-5 mr-2" />
                <span>{data.difficulty}</span>
              </div>
            </div>

            <p className="text-gray-600 mb-8">{data.description}</p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
                <ul className="space-y-3">
                  {JSON.parse(data.ingredients).map((ingredient: string, index: number) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
                <ol className="space-y-6">
                  {JSON.parse(data.instructions).map((instruction: string, index: number) => (
                    <li key={index} className="flex">
                      <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-medium mr-4">
                        {index + 1}
                      </span>
                      <p className="text-gray-600">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;