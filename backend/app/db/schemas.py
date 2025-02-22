from pydantic import BaseModel
from typing import List, Dict, Any
import json

class UserBase(BaseModel):
    email: str
    first_name: str = None
    last_name: str = None

class UserCreate(UserBase):
    first_name: str
    last_name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

class RecipeBase(BaseModel):
    title: str
    image_url: str
    rating: float
    duration: int
    difficulty: str
    user_id: int
    description: str
    ingredients: str
    instructions: str

    def get_ingredients(self):
        return json.loads(self.ingredients) if self.ingredients else []

    def get_instructions(self):
        return json.loads(self.instructions) if self.instructions else []

class RecipeCreate(RecipeBase):
    pass

class RecipeResponse(RecipeBase):
    id: int
    
    class Config:
        orm_mode = True