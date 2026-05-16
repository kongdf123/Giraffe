import requests
from app.config import JAVA_API_BASE

def get_pending_tasks():
    url = f"{JAVA_API_BASE}/api/tasks/pending"
    response = requests.get(url, timeout=10)
    response.raise_for_status()
    return response.json()