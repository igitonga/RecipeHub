import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import RecipeDetails from './pages/RecipeDetails';
import AddRecipe from './pages/AddRecipe';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
            <Header />
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/add/recipe" element={<AddRecipe />} />
          </Routes>
        </div>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;