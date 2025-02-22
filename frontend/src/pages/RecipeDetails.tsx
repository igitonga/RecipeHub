import { useParams } from 'react-router-dom';
import { Clock, Users, ChefHat, Star } from 'lucide-react';

// This would typically come from an API or database
const recipeDetails = {
  1: {
    title: "Creamy Tuscan Pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    cookTime: "30 mins",
    difficulty: "Easy",
    servings: 4,
    description: "A rich and creamy pasta dish inspired by the flavors of Tuscany, featuring sun-dried tomatoes, spinach, and Italian herbs.",
    ingredients: [
      "1 pound fettuccine pasta",
      "2 cups heavy cream",
      "4 cloves garlic, minced",
      "1 cup sun-dried tomatoes, chopped",
      "2 cups fresh spinach",
      "1 cup freshly grated Parmesan cheese",
      "1 tablespoon Italian seasoning",
      "Salt and pepper to taste",
      "2 tablespoons olive oil"
    ],
    instructions: [
      "Bring a large pot of salted water to boil and cook pasta according to package instructions.",
      "In a large skillet, heat olive oil over medium heat. Add minced garlic and sauté until fragrant.",
      "Add sun-dried tomatoes and cook for 2-3 minutes.",
      "Pour in heavy cream and bring to a gentle simmer. Add Italian seasoning, salt, and pepper.",
      "Stir in Parmesan cheese until melted and sauce is smooth.",
      "Add spinach and cook until wilted.",
      "Drain pasta and add to the sauce, tossing to combine.",
      "Serve hot, garnished with extra Parmesan cheese and fresh herbs if desired."
    ]
  },
  // Add more recipes as needed
};

function RecipeDetails() {
  const { id } = useParams();
  const recipe = id ? recipeDetails[Number(id)] : null;

  if (!recipe) {
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
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-md flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-medium">{recipe.rating}</span>
            </div>
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{recipe.title}</h1>
            
            <div className="flex items-center space-x-8 mb-8">
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                <span>{recipe.cookTime}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-5 h-5 mr-2" />
                <span>{recipe.servings} servings</span>
              </div>
              <div className="flex items-center text-gray-600">
                <ChefHat className="w-5 h-5 mr-2" />
                <span>{recipe.difficulty}</span>
              </div>
            </div>

            <p className="text-gray-600 mb-8">{recipe.description}</p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
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
                  {recipe.instructions.map((instruction, index) => (
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