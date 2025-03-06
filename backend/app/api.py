from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import recipes
from app.routers import users

app = FastAPI()

origins = [
    "http://localhost:5173",
    "localhost:5173",
    "https://cheffingrecipes.netlify.app"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to recipe app."}

app.include_router(recipes.router)
app.include_router(users.router)