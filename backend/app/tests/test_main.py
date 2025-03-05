import pytest
from fastapi.testclient import TestClient
from app.api import app

client = TestClient(app)

def test_create_user():
    response = client.post(
        "/login",json={"password": "password", "email": "john@doe.com"},
    )
    assert response.status_code == 200
