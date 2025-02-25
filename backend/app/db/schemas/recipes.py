from pydantic import BaseModel
import json

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

class RecipeUpdate(BaseModel):
    title: str
    image_url: str
    rating: float
    duration: int
    difficulty: str
    description: str
    ingredients: str
    instructions: str

class RecipeResponse(RecipeBase):
    id: int
    
    class Config:
        orm_mode = True