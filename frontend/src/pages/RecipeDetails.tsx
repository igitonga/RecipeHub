import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Users, ChefHat, Star, MoreVertical, Edit2, Trash2, Plus, Minus, X } from 'lucide-react';
import { DeleteRecipe, GetRecipe, UpdateRecipe } from '../lib/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [rating, setRating] = useState(0);
  const [duration, setDuration] = useState(0);
  const [difficulty, setDifficulty] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);


  const { isPending, isError, data, error } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => GetRecipe(Number(id)),
  });

  const UpdateRecipeMutation = useMutation({
    mutationFn: () => UpdateRecipe(Number(id), {
      title,
      image_url: imageUrl,
      rating,
      duration,
      difficulty,
      description,
      ingredients: JSON.stringify(ingredients.map((ingredient) => ingredient)), 
      instructions: JSON.stringify(instructions.map((instruction) => instruction))
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      toast.success('Recipe upated successfully');
      navigate('/recipes');
    },
    onError: (error: any) => {
      toast.error(error.message);
    }
  });

  const DeleteRecipeMutation = useMutation({
    mutationFn: () => DeleteRecipe(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      toast.success('Recipe deleted successfully');
      navigate('/recipes');
    },
    onError: (error: any) => {
      toast.error(error.message);
    }
  });

  const handleEdit = () => {
    setTitle(data.title);
    setImageUrl(data.image_url);
    setRating(data.rating);
    setDuration(data.duration);
    setDifficulty(data.difficulty);
    setDescription(data.description);
    setIngredients(JSON.parse(data.ingredients));
    setInstructions(JSON.parse(data.instructions));

    setIsEditDialogOpen(true);
    setIsMenuOpen(false);
  }

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
    if (confirmDelete) {
      DeleteRecipeMutation.mutate();
    }
    setIsMenuOpen(false);
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();

    UpdateRecipeMutation.mutate();
    
    setIsEditDialogOpen(false);
  }
   
  const addIngredient = () => {
    setIngredients([...ingredients]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addInstruction = () => {
    setInstructions([...instructions]);
  };

  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    toast.error(error.message);
    return null;
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
    <>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative h-96">
              <img
                src={data.image_url}
                alt={data.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex items-center space-x-2">
                <div className="bg-white px-4 py-2 rounded-full shadow-md flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{data.rating}</span>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu">
                        <button
                          onClick={handleEdit}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit Recipe
                        </button>
                        <button
                          onClick={handleDelete}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          role="menuitem"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Recipe
                        </button>
                      </div>
                    </div>
                  )}
                </div>
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

      {/* Edit Dialog */}
      {isEditDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Edit Recipe</h2>
                <button
                  onClick={() => setIsEditDialogOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Recipe Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                      Image URL
                    </label>
                    <input
                      type="url"
                      id="imageUrl"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                        Rating
                      </label>
                      <input
                        type="number"
                        id="rating"
                        min="0"
                        max="5"
                        step="0.1"
                        value={rating}
                        onChange={(e) => setRating(parseFloat(e.target.value))}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                        Duration (minutes)
                      </label>
                      <input
                        type="number"
                        id="duration"
                        min="1"
                        value={duration}
                        onChange={(e) => setDuration(parseInt(e.target.value))}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
                        Difficulty
                      </label>
                      <select
                        id="difficulty"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        <option value="">Select difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Ingredients</h2>
                    <button
                      type="button"
                      onClick={addIngredient}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Ingredient
                    </button>
                  </div>

                  <div className="space-y-4">
                    {ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-medium">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <textarea
                            value={ingredient}
                            onChange={(e) => updateIngredient(index, e.target.value)}
                            rows={2}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder={`Step ${index + 1}`}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeIngredient(index)}
                          className="p-2 text-gray-400 hover:text-red-500"
                        >
                          <Minus className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Instructions</h3>
                    <button
                      type="button"
                      onClick={addInstruction}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Step
                    </button>
                  </div>

                  <div className="space-y-4">
                    {instructions.map((instruction, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-medium">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <textarea
                            value={instruction}
                            onChange={(e) => updateInstruction(index, e.target.value)}
                            rows={2}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder={`Step ${index + 1}`}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeInstruction(index)}
                          className="p-2 text-gray-400 hover:text-red-500"
                        >
                          <Minus className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditDialogOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RecipeDetails;