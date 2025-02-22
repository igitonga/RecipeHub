import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
});

interface UserInput {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export const CreateUser = async (user: UserInput) => {
    try {
        const res = await api.post('/create/user', user);
        return res.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
} 

interface LoginInput {
    email: string;
    password: string;
}

export const LoginUser = async (user: LoginInput) => {
    try {
        const res = await api.post('/login', user);
        return res.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const GetRecipes = async () => {
    try {
        const res = await api.get('/recipes');
        return res.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

interface RecipeInput {
    title: string;
    image_url: string;
    rating: number;
    duration: number;
    difficulty: string;
    description: string;
    ingredients: string;
    instructions: string;
    user_id: number;
}

export const CreateRecipe = async (recipe: RecipeInput) => {
    console.log(recipe);
    try {
        const res = await api.post('/create/recipe', recipe);
        return res.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}