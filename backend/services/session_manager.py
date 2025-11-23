import uuid
from typing import Dict, List


class SessionManager:
    def __init__(self):
# sessions: session_id -> dict
        self.sessions: Dict[str, Dict] = {}


    def create_session(self) -> str:
        sid = str(uuid.uuid4())
        self.sessions[sid] = {
        "role": None,
        "mode": "chat",
        "history": [],
        "scores": [],
        }
        return sid


    def start_session(self, session_id: str):
        self.sessions[session_id]["started"] = True


    def set_role(self, session_id: str, role: str):
        self.sessions[session_id]["role"] = role


    def set_mode(self, session_id: str, mode: str):
        self.sessions[session_id]["mode"] = mode


    def add_user_message(self, session_id: str, message: str):
        self.sessions[session_id]["history"].append({"role": "user", "text": message})


    def add_agent_message(self, session_id: str, message: str):
        self.sessions[session_id]["history"].append({"role": "agent", "text": message})


    def get_history(self, session_id: str) -> List[Dict]:
        return self.sessions[session_id]["history"]


    def end_session(self, session_id: str):
        if session_id in self.sessions:
            del self.sessions[session_id]


    def generate_feedback(self, session_id: str):
# Simple heuristic feedback: if any agent messages present, score communication high
        history = self.get_history(session_id)
        comm_score = 4
        tech_score = 3
# look for keywords as weak technical indicators (very naive)
        for turn in history:
            if turn["role"] == "user":
                txt = (turn["text"] or "").lower()
                if any(k in txt for k in ["hash", "consistency", "shard", "cache"]):
                    tech_score = max(tech_score, 4)
        overall = int((comm_score + tech_score) / 2)
        return {
        "scores": {"communication": comm_score, "technical": tech_score, "overall": overall},
        }