import os
import asyncio
from typing import AsyncGenerator, List, Dict
import httpx


GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_API_URL = os.getenv("GEMINI_API_URL")


class GeminiClient:
    def __init__(self):
        self.api_key = GEMINI_API_KEY
        self.api_url = GEMINI_API_URL


    async def stream_response(self, session_id: str, user_message: str, history: List[Dict]) -> AsyncGenerator[str, None]:

    # MOCK MODE — return immediately
        if not self.api_key or not self.api_url:
            full = self._mock_agent_reply(user_message, history)
            for chunk in self._chunk_text(full, 40):
                await asyncio.sleep(0.02)
                yield chunk
            return  # <-- VERY IMPORTANT


# Real API call (streaming) - example for a REST streaming endpoint
        headers = {
        "Authorization": f"Bearer {self.api_key}",
        "Content-Type": "application/json",
    }


# Build prompt using history
        prompt = self._build_prompt(user_message, history)


        data = {
"prompt": prompt,
"max_output_tokens": 256,
"temperature": 0.3,
}


        async with httpx.AsyncClient(timeout=60.0) as client:
# Note: actual Gemini streaming API specifics may differ; adapt when you have provider docs
            async with client.stream("POST", self.api_url, headers=headers, json=data) as resp:
                async for raw in resp.aiter_text():
                    if raw:
# naive parsing; in real usage parse event stream
                        yield raw


    def _mock_agent_reply(self, user_message: str, history: List[Dict]) -> str:
# Simple deterministic response to demonstrate streaming
        return (
"Thanks — interesting answer. Can you structure that using STAR (Situation, Task, Action, Result)? "
"Also include one quantitative outcome and any trade-offs you considered."
)


    def _chunk_text(self, text: str, chunk_size: int):
        for i in range(0, len(text), chunk_size):
            yield text[i:i+chunk_size]


    def _build_prompt(self, user_message: str, history: List[Dict]) -> str:
# build a concise system + conversation prompt
        parts = ["You are an interviewer. Ask concise follow-up questions and evaluate answers."]
        for turn in history[-6:]:
            speaker = turn["role"]
            parts.append(f"{speaker}: {turn['text']}")
        parts.append(f"user: {user_message}")
        parts.append("agent:")
        return "\n".join(parts)