import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import RecipeDetails from './pages/RecipeDetails';
import AddRecipe from './pages/AddRecipe';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { login } = useAuth();
  const storedToken = localStorage.getItem('accessToken');
  const storedUserId = localStorage.getItem('userId');

  if (storedToken && storedUserId) {
    login(storedToken, parseInt(storedUserId));
  }

  return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/add/recipe" element={<AddRecipe />} />
        </Routes>
      </div>
  );
}

export default App;