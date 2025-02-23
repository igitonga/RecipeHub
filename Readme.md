# Recipe App 

## Getting started

This project is a simple recipe app that allows you to add, edit, and delete recipes.

### Technologies

- FastAPI
- React
- React Router
- React Query
- TailwindCSS
- PostgreSQL
- SQLAlchemy
- Alembic


### Requirements

- Python 3.10+
- Node.js 18+
- PostgreSQL 14+

### Installation

1. Clone the repository
2. Install the dependencies

### Move into backend directory
```bash
cd backend
```

### Create and activate virtual environment
```bash
python -m venv venv
source venv/bin/activate
```

### Install the dependencies
```bash
pip install -r requirements.txt
```

### Create .env file
```bash
cp .env.example .env
```

### Run the migrations
```bash
alembic upgrade head
```

### Run the backend
```bash
python main.py
```

### Move into frontend directory
```bash
cd frontend
```

### Install the dependencies
```bash
npm install
```

### Run the frontend
```bash
npm run dev
```