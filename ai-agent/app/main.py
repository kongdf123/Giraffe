from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models.chat_models import ChatRequest, ChatResponse
from app.agent.workflow_agent import run_agent

app = FastAPI(title="AI Workflow Agent")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/agent/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    answer = run_agent(req.message)
    return ChatResponse(answer=answer)