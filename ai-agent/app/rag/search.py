from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer

COLLECTION_NAME = "workflow_docs"

client = QdrantClient(host="localhost", port=6333)
model = SentenceTransformer("all-MiniLM-L6-v2")

def search_documents(query: str):
    vector = model.encode(query).tolist()

    hits = client.search(
        collection_name=COLLECTION_NAME,
        query_vector=vector,
        limit=3
    )

    return [hit.payload["content"] for hit in hits]