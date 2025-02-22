import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { ChefHat, Plus, Minus, Loader2 } from 'lucide-react';
import { CreateRecipe } from '../lib/api';
import toast from 'react-hot-toast';

function AddRecipe() {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [rating, setRating] = useState(0);
  const [duration, setDuration] = useState(0);
  const [difficulty, setDifficulty] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([{ step: '' }]);
  const [instructions, setInstructions] = useState([{ step: '' }]);


  const AddRecipeMutation = useMutation({
    mutationFn: CreateRecipe,
    onSuccess: () => {
      toast.success('Recipe added successfully');
      navigate('/recipes');
    },
    onError: (error: any) => {
      toast.error(error.message);
    }
  });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    AddRecipeMutation.mutate({
      title,
      image_url: imageUrl,
      rating,
      duration,
      difficulty,
      description,
      ingredients: JSON.stringify(ingredients.map((ingredient) => ingredient.step)), 
      instructions: JSON.stringify(instructions.map((instruction) => instruction.step)), 
      user_id: 2
    },
    {
      onSettled: () => {
        setLoading(false);
      }
    }
    );
    
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { step: '' }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { step: value };
    setIngredients(newIngredients);
  };

  const addInstruction = () => {
    setInstructions([...instructions, { step: '' }]);
  };

  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = { step: value };
    setInstructions(newInstructions);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-center mb-8">
            <ChefHat className="h-12 w-12 text-indigo-600" />
            <h1 className="ml-4 text-3xl font-bold text-gray-900">Add New Recipe</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
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
                  placeholder="Enter recipe title"
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
                  placeholder="Enter image URL"
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
                  placeholder="Describe your recipe"
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
                        value={ingredient.step}
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
                <h2 className="text-xl font-semibold text-gray-900">Instructions</h2>
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
                        value={instruction.step}
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

            <button
                disabled={loading}
                type="submit"
                className="cursor-pointer w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Add Recipe'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddRecipe;