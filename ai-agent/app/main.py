from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models.chat_models import ChatRequest, ChatResponse
from app.agent.workflow_agent import run_agent
from app.rag.qa_service import rag_answer

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

@app.post("/api/agent/rag-chat")
def rag_chat(req: ChatRequest):
    answer = rag_answer(req.message)
    return ChatResponse(answer=answer)