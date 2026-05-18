from fastapi import FastAPI, Path, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path


from app.models.chat_models import ChatRequest, ChatResponse
from app.agent.workflow_agent import execute_workflow_agent, run_agent
from app.rag.ingest import ingest_single_document
from app.rag.qa_service import rag_answer
from app.rag.upload_service import save_uploaded_file

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

# @app.post("/api/agent/rag-chat")
# def rag_chat(req: ChatRequest):
#     answer = rag_answer(req.message)
#     return ChatResponse(answer=answer)

@app.post("/api/documents/upload")
async def upload_document(file: UploadFile = File(...)):
    saved_path = save_uploaded_file(file)
    ingest_single_document(saved_path)

    return {
        "message": "uploaded",
        "fileName": file.filename
    }

@app.get("/api/documents")
def list_documents():
    upload_dir = Path("uploads")

    files = [f.name for f in upload_dir.glob("*")]

    return files

@app.post("/api/agent/rag-chat")
def rag_chat(req: ChatRequest):
    return rag_answer(req.message)

@app.post("/api/agent/action")
def action_agent(req: AgentRequest):
    return execute_workflow_agent(req.message)