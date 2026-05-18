from langchain_openai import ChatOpenAI
from app.config import DEEPSEEK_API_KEY
from app.agent.tools import (
    create_workflow_request,
    get_pending_tasks,
    get_workflow_detail
)

llm = ChatOpenAI(
    model="deepseek-chat",
    api_key=DEEPSEEK_API_KEY,
    base_url="https://api.deepseek.com"
)

def execute_workflow_agent(message: str):
    lower = message.lower()

    if "create" in lower:
        result = create_workflow_request(message)

        return {
            "answer": f"Workflow created successfully: {result}"
        }

    if "pending" in lower:
        result = get_pending_tasks()

        return {
            "answer": f"Pending approvals: {result}"
        }

    if "summarize" in lower:
        request_id = 1
        result = get_workflow_detail(request_id)

        prompt = f"""
Summarize the following workflow request:

{result}
"""

        summary = llm.invoke(prompt)

        return {
            "answer": summary.content
        }

    return {
        "answer": "Unsupported action."
    }

# import json
# from langchain_openai import ChatOpenAI
# from app.config import DEEPSEEK_API_KEY
# from app.tools.workflow_tools import get_pending_tasks

# llm = ChatOpenAI(
#     model="deepseek-chat",
#     api_key=DEEPSEEK_API_KEY,
#     base_url="https://api.deepseek.com"
# )

# def run_agent(message: str) -> str:
#     tasks = get_pending_tasks()

#     prompt = f"""
# You are an enterprise workflow assistant.

# User question:
# {message}

# Current pending tasks:
# {json.dumps(tasks, ensure_ascii=False, indent=2)}

# Please answer clearly and briefly.
# """

#     result = llm.invoke(prompt)
#     return result.content