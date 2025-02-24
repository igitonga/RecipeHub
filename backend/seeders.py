from sqlalchemy.orm import Session, sessionmaker
from app.db.models.recipes import Recipe
from app.db.models.users import User
from app.utils.password import Hasher
from sqlalchemy import create_engine
from dotenv import load_dotenv
import os
import json

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

def seed_users(db: Session):
    users = [
        User(first_name="John", last_name="Doe", email="john.doe@example.com", hashed_password=Hasher.get_password_hash("password")),
        User(first_name="Jane", last_name="Doe", email="jane.doe@example.com", hashed_password=Hasher.get_password_hash("password"))
    ]
    for user in users:
        db.add(user)
    db.commit()
    print("Users seeded successfully!")

def seed_recipes(db: Session):
    recipes = [
        Recipe(
            title="Spaghetti Carbonara",
            image_url="https://images.unsplash.com/photo-1633337474564-1d9478ca4e2e?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            rating=4.8,
            duration=25,
            difficulty="Easy",
            user_id=3,
            description="A classic Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
            ingredients=json.dumps(["200g spaghetti", "100g pancetta", "2 large eggs", "50g Parmesan cheese", "Salt", "Black pepper"]),
            instructions=json.dumps([
                "Cook spaghetti according to package instructions.",
                "Fry pancetta until crispy.",
                "Whisk eggs and Parmesan together.",
                "Combine pasta, pancetta, and egg mixture off heat.",
                "Season with black pepper and serve."
            ])
        ),
        Recipe(
            title="Chicken Tikka Masala",
            image_url="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            rating=4.7,
            duration=40,
            difficulty="Medium",
            user_id=4,
            description="A creamy, spiced tomato-based Indian dish with marinated chicken.",
            ingredients=json.dumps(["500g chicken breast", "200ml yogurt", "1 tbsp garam masala", "1 tbsp turmeric", "1 onion", "2 cloves garlic", "1-inch ginger", "400g canned tomatoes", "200ml cream", "Salt", "Cilantro"]),
            instructions=json.dumps([
                "Marinate chicken in yogurt and spices for 1 hour.",
                "Grill or pan-fry the chicken until golden.",
                "Sauté onions, garlic, and ginger.",
                "Add tomatoes and cook until thick.",
                "Blend sauce and add cream.",
                "Mix in chicken and simmer.",
                "Garnish with cilantro and serve."
            ])
        ),
        Recipe(
            title="Chocolate Chip Cookies",
            image_url="https://images.unsplash.com/photo-1584847801423-852691e41bc7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            rating=4.9,
            duration=30,
            difficulty="Easy",
            user_id=4,
            description="Classic chewy and gooey chocolate chip cookies.",
            ingredients=json.dumps(["250g flour", "1 tsp baking soda", "150g butter", "100g sugar", "100g brown sugar", "1 egg", "1 tsp vanilla extract", "150g chocolate chips"]),
            instructions=json.dumps([
                "Preheat oven to 180°C.",
                "Mix dry ingredients in one bowl.",
                "Cream butter and sugars together.",
                "Add egg and vanilla, mix well.",
                "Combine wet and dry ingredients.",
                "Fold in chocolate chips.",
                "Scoop onto a baking sheet.",
                "Bake for 10-12 minutes."
            ])
        ),
        Recipe(
            title="Beef Tacos",
            image_url="https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80&w=2988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            rating=4.6,
            duration=20,
            difficulty="Easy",
            user_id=2,
            description="Quick and flavorful ground beef tacos with fresh toppings.",
            ingredients=json.dumps(["500g ground beef", "1 tbsp taco seasoning", "1 onion", "1 tomato", "100g lettuce", "100g shredded cheese", "6 small tortillas", "Sour cream", "Hot sauce"]),
            instructions=json.dumps([
                "Cook ground beef with taco seasoning.",
                "Chop onions, tomatoes, and lettuce.",
                "Warm tortillas in a pan.",
                "Assemble tacos with beef, veggies, and cheese.",
                "Top with sour cream and hot sauce."
            ])
        ),
        Recipe(
            title="Mango Smoothie",
            image_url="https://images.unsplash.com/photo-1619898804188-e7bad4bd2127?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            rating=4.8,
            duration=5,
            difficulty="Easy",
            user_id=3,
            description="A refreshing and creamy mango smoothie.",
            ingredients=json.dumps(["2 ripe mangoes", "200ml milk", "100ml yogurt", "1 tbsp honey", "Ice cubes"]),
            instructions=json.dumps([
                "Peel and chop mangoes.",
                "Blend all ingredients until smooth.",
                "Pour into a glass and serve."
            ])
        )
    ]

    for recipe in recipes:
        db.add(recipe)
    db.commit()
    print("Recipes seeded successfully!")


if __name__ == "__main__":
    seed_users(session)
    seed_recipes(session)
    session.close()
    print("Seeding completed successfully!")

