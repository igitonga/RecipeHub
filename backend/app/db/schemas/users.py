from pydantic import BaseModel

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
    user_id: int

class User(UserBase):
    id: int

    class Config:
        orm_mode = True