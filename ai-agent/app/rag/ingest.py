from pathlib import Path
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct, VectorParams, Distance
from sentence_transformers import SentenceTransformer

COLLECTION_NAME = "workflow_docs"

client = QdrantClient(host="localhost", port=6333)
model = SentenceTransformer("all-MiniLM-L6-v2")

def load_text_files():
    base = Path("knowledge-base")
    texts = []

    for file in base.glob("*.txt"):
        content = file.read_text(encoding="utf-8")
        texts.append(content)

    return texts

def ingest_documents():
    docs = load_text_files()

    client.recreate_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=384, distance=Distance.COSINE)
    )

    points = []

    for idx, doc in enumerate(docs):
        embedding = model.encode(doc).tolist()

        points.append(
            PointStruct(
                id=idx + 1,
                vector=embedding,
                payload={"content": doc}
            )
        )

    client.upsert(
        collection_name=COLLECTION_NAME,
        points=points
    )

if __name__ == "__main__":
    ingest_documents()