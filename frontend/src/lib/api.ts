import axios from "axios";

const api = axios.create({
    baseURL: 'https://fastapi-react-tb2v.onrender.com',
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
    try {
        const res = await api.post('/create/recipe', recipe);
        return res.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const GetRecipe = async (recipe_id: number) => {
    try {
        const res = await api.get(`/recipe/${recipe_id}`);
        return res.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const DeleteRecipe = async (recipe_id: number) => {
    try {
        const res = await api.delete(`/recipe/${recipe_id}`);
        return res.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

interface UpdateRecipeInput {
    title: string;
    image_url: string;
    rating: number;
    duration: number;
    difficulty: string;
    description: string;
    ingredients: string;
    instructions: string;
}

export const UpdateRecipe = async (recipe_id: number, recipe: UpdateRecipeInput) => {
    console.log(recipe);
    try {
        const res = await api.put(`/recipe/${recipe_id}`, recipe);
        return res.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
    