# agent/agent.py
import asyncio
from typing import AsyncGenerator, Optional
from .session import Session
from .llm_adapter import MockLLMAdapter
from .utils import normalize_text

class InterviewAgent:
    # Static questions for demo
    STATIC_QUESTIONS = {
        "engineer": [
            "Tell me about yourself.",
            "Explain a time you had to debug a critical production issue.",
            "Describe a project you are most proud of.",
            "How do you handle tight deadlines?",
        ],
        "sales": [
            "Tell me about yourself.",
            "How do you approach discovering a prospect's pain points?",
            "Describe a time you closed a challenging deal.",
            "How do you handle rejection in sales?",
        ]
    }

    def __init__(self, llm_adapter: Optional[MockLLMAdapter] = None):
        self.llm = llm_adapter or MockLLMAdapter()
        self.sessions = {}  # session_id -> Session

    def create_session(self, role: str = "engineer", level: str = "junior", mode: str = "chat") -> Session:
        s = Session(role=role, level=level, mode=mode)
        s.question_index = 0  # initialize question index
        self.sessions[s.session_id] = s
        return s

    def get_session(self, session_id: str) -> Session:
        return self.sessions[session_id]

    async def handle_user_response_and_stream(
        self,
        session: Session,
        user_text: str,
        first_question: bool = False
    ) -> AsyncGenerator[str, None]:
        user_text = normalize_text(user_text)
        session.add_turn("user", user_text)

        # Pick questions based on role
        questions = self.STATIC_QUESTIONS.get(session.role, ["Tell me about yourself."])

        # Determine next question
        if first_question:
            session.question_index = 0  # reset
        if session.question_index < len(questions):
            next_q = questions[session.question_index]
            session.question_index += 1
        else:
            next_q = "That concludes the interview. Thank you!"

        # Add next question to session history
        session.add_turn("agent", next_q)
        yield next_q

    def end_interview_and_get_feedback(self, session: Session):
        # static feedback for demo
        feedback = {
            "scores": {"communication": 4, "technical": 5, "behavioral": 3},
            "summary": "Great job overall! You demonstrated strong skills.",
        }
        return feedback
