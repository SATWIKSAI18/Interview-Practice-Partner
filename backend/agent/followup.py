# agent/followup.py
from typing import Optional
import re

FILLER_WORDS = {'um', 'uh', 'like', 'you know', 'so', 'actually'}

def contains_metrics(text: str) -> bool:
    # crude check: looks for numbers or % or currency
    return bool(re.search(r'\d+(\.\d+)?\s*(%|k|m|\+)?', text))

def uses_star(text: str) -> bool:
    # look for keywords likely indicating STAR structure
    txt = text.lower()
    return all(k in txt for k in ("situation", "task", "action", "result")) or len(txt.split()) > 30 and contains_metrics(txt)

def wants_deeper_technical(question: str) -> bool:
    return any(w in question.lower() for w in ("design", "algorithm", "scale", "optimize"))

def next_followup_for(last_user_text: str, last_question: Optional[str]) -> Optional[str]:
    if not last_user_text or len(last_user_text.strip()) < 10:
        return "Could you expand on that? Give one concrete example or specific steps."
    if not uses_star(last_user_text):
        return "Can you structure that using STAR (Situation, Task, Action, Result) and include outcomes?"
    if wants_deeper_technical(last_question or "") and not contains_metrics(last_user_text):
        return "Can you provide numbers, performance targets or expected complexity for your approach?"
    # if none matched, return None (agent can proceed)
    return None
