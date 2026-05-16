import os
from dotenv import load_dotenv

load_dotenv()

# DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")
# JAVA_API_BASE = os.getenv("JAVA_API_BASE")

JAVA_API_BASE = os.getenv("JAVA_API_BASE", "http://localhost:8080")
DEEPSEEK_API_KEY = os.environ.get("DEEPSEEK_API_KEY")