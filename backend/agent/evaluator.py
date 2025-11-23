# agent/evaluator.py
from typing import List, Dict
from .followup import contains_metrics, uses_star
import re

def count_fillers(text: str) -> int:
    # naive filler detection
    return len(re.findall(r'\b(um|uh|like|you know|so|actually)\b', text.lower()))

def score_communication(text: str) -> int:
    fillers = count_fillers(text)
    words = len(text.split())
    if words == 0:
        return 1
    # heuristics: more words but fewer fillers -> better score
    ratio = max(0, 1 - (fillers / max(1, words/10)))
    # map ratio to 1-5
    return min(5, max(1, int(round(ratio * 5))))

def score_technical(text: str) -> int:
    # presence of metrics and STAR -> higher score
    score = 1
    if contains_metrics(text):
        score += 2
    if uses_star(text):
        score += 2
    # cap
    return min(5, score)

def aggregate_feedback(history) -> Dict:
    # history: list of Turn objects (from session.history)
    comm_scores = []
    tech_scores = []
    suggestions = []
    for turn in history:
        if turn.speaker == "user":
            comm_scores.append(score_communication(turn.text))
            tech_scores.append(score_technical(turn.text))
            if count_fillers(turn.text) > 2:
                suggestions.append("Reduce filler words (um/uh/like) to sound more confident.")
            if not contains_metrics(turn.text):
                suggestions.append("Where possible, include numbers to quantify impact.")
            if not uses_star(turn.text):
                suggestions.append("Structure behavioral answers using STAR (Situation, Task, Action, Result).")

    # average scores
    avg_comm = int(round(sum(comm_scores)/len(comm_scores))) if comm_scores else 1
    avg_tech = int(round(sum(tech_scores)/len(tech_scores))) if tech_scores else 1
    overall = int(round((avg_comm + avg_tech) / 2))

    return {
        "scores": {"communication": avg_comm, "technical": avg_tech, "overall": overall},
        "recommendations": list(dict.fromkeys(suggestions))[:6]  # unique, limit 6
    }
