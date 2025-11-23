# backend/main.py

from dotenv import load_dotenv  # 1. import dotenv
import os

# 2. Load .env before anything else
load_dotenv()

# 3. Optional: verify the key is loaded
print("OpenAI key loaded:", os.getenv("OPENAI_API_KEY"))

# --- existing imports ---
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import interview

# --- FastAPI app setup ---
app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(interview.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
