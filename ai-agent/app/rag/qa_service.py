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

    context = "\n".join(docs)

    prompt = f"""
Answer based only on the following company documents:

{context}

Question:
{question}
"""

    result = llm.invoke(prompt)
    return result.content