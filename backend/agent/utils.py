# agent/utils.py
import re
import os
import openai
from dotenv import load_dotenv

# Load .env so OPENAI_API_KEY is available
load_dotenv()

def normalize_text(s: str) -> str:
    return re.sub(r'\s+', ' ', s.strip())

def simple_token_count(s: str) -> int:
    return len(s.split())

def get_interview_questions(role: str, n: int = 5) -> list[str]:
    """
    Generate `n` interview questions for a given job role dynamically using OpenAI.
    """
    openai.api_key = os.getenv("OPENAI_API_KEY")  # now it will read from .env correctly

    prompt = f"Generate {n} interview questions for the role of {role}. Number each question."

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7
    )

    text = response.choices[0].message.content
    questions = [q.strip() for q in text.split("\n") if q.strip() and any(c.isalnum() for c in q)]
    return questions
