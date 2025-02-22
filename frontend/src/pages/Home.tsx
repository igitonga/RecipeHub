import { ChefHat, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side - Image */}
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=2000"
                alt="Cooking preparation with fresh ingredients"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
              <ChefHat className="w-8 h-8 text-indigo-600" />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="lg:w-1/2 space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Discover the Joy of
              <span className="text-indigo-600 block">Home Cooking</span>
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Explore our curated collection of delicious recipes, from quick weekday meals to impressive dinner party showstoppers. Whether you're a beginner or a seasoned chef, find inspiration for your next culinary adventure.
            </p>

            <button onClick={() => navigate('/recipes')} className="cursor-pointer inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
              View Recipes
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;