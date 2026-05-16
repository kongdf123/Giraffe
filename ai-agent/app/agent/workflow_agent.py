import json
from langchain_openai import ChatOpenAI
from app.config import DEEPSEEK_API_KEY
from app.tools.workflow_tools import get_pending_tasks

llm = ChatOpenAI(
    model="deepseek-chat",
    api_key=DEEPSEEK_API_KEY,
    base_url="https://api.deepseek.com"
)

def run_agent(message: str) -> str:
    tasks = get_pending_tasks()

    prompt = f"""
You are an enterprise workflow assistant.

User question:
{message}

Current pending tasks:
{json.dumps(tasks, ensure_ascii=False, indent=2)}

Please answer clearly and briefly.
"""

    result = llm.invoke(prompt)
    return result.content