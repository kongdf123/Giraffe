import requests
from app.config import JAVA_API_BASE

# def get_pending_tasks():
#     url = f"{JAVA_API_BASE}/api/tasks/pending"
#     response = requests.get(url, timeout=10)
#     response.raise_for_status()
#     return response.json()

def create_workflow_request(content: str):
    payload = {
        "title": content,
        "description": content,
        "requesterId": 1
    }

    res = requests.post(
        f"{JAVA_API_BASE}/workflow-requests",
        json=payload
    )

    return res.json()

def get_pending_tasks():
    res = requests.get(
        f"{JAVA_API_BASE}/approval-tasks/pending"
    )

    return res.json()

def get_workflow_detail(request_id: int):
    res = requests.get(
        f"{JAVA_API_BASE}/workflow-requests/{request_id}"
    )

    return res.json()