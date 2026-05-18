from langchain_openai import ChatOpenAI
from app.config import DEEPSEEK_API_KEY
from app.rag.search import search_documents

llm = ChatOpenAI(
    model="deepseek-chat",
    api_key=DEEPSEEK_API_KEY,
    base_url="https://api.deepseek.com"
)

def rag_answer(question: str):
    docs = search_documents(question)

    context = "\n\n".join(
        [f"[Source: {d['source']}]\n{d['content']}" for d in docs]
    )

    prompt = f"""
Answer only based on the provided company documents.

Include source file names in final answer.

Documents:
{context}

Question:
{question}
"""

    result = llm.invoke(prompt)

    return {
        "answer": result.content,
        "sources": list(set([d["source"] for d in docs]))
    }