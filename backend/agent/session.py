# agent/session.py
from dataclasses import dataclass, field
from typing import List, Dict, Any
import time
import uuid

@dataclass
class Turn:
    turn_id: int
    speaker: str  # "user" or "agent"
    text: str
    ts: float = field(default_factory=time.time)
    meta: Dict[str, Any] = field(default_factory=dict)

@dataclass
class Session:
    session_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    role: str = "engineer"   # or 'sales', 'retail'
    level: str = "junior"    # or 'mid', 'senior'
    mode: str = "chat"       # 'chat' | 'voice' | 'mixed'
    history: List[Turn] = field(default_factory=list)
    turn_counter: int = 0

    def add_turn(self, speaker: str, text: str, meta: dict = None) -> Turn:
        self.turn_counter += 1
        t = Turn(turn_id=self.turn_counter, speaker=speaker, text=text, meta=(meta or {}))
        self.history.append(t)
        return t

    def last_user_turn(self) -> Turn | None:
        for t in reversed(self.history):
            if t.speaker == "user":
                return t
        return None
