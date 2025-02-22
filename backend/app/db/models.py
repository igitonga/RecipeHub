from sqlalchemy import Column, Integer, String, Float, Text, JSON, ForeignKey
import json
from app.db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    first_name = Column(String)
    last_name = Column(String)
    hashed_password = Column(String, nullable=False)

class Recipe(Base):
    __tablename__ = 'recipes'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    image_url = Column(String)
    rating = Column(Float)
    duration = Column(Integer)
    difficulty = Column(String)
    user_id = Column(Integer, ForeignKey('users.id')) 
    description = Column(Text)
    ingredients = Column(Text)
    instructions = Column(Text)

    def as_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "image_url": self.image_url,
            "rating": self.rating,
            "duration": self.duration,
            "difficulty": self.difficulty,
            "user_id": self.user_id,
            "description": self.description,
            "ingredients": json.loads(self.ingredients) if self.ingredients else [],  # Convert string to JSON
            "instructions": json.loads(self.instructions) if self.instructions else [],  # Convert string to JSON
            }