# agent/llm_adapter.py
import asyncio
from typing import AsyncGenerator, List, Tuple
import random

class LLMAdapter:
    """Abstract adapter interface."""
    async def stream_generate(
        self,
        system_prompt: str,
        prompt: str,
        conversation_history: List[Tuple[str, str]] = [],
        temperature: float = 0.3
    ) -> AsyncGenerator[str, None]:
        raise NotImplementedError()


class MockLLMAdapter(LLMAdapter):
    """Mock adapter with deterministic first 2 questions, then random."""
    first_questions = [
        "Tell me about yourself.",
        "Tell me about your recent project and what tech stack you used."
    ]

    questions_pool = [
        "Explain a time you solved a complex bug.",
        "Describe a challenging project and how you handled it.",
        "How do you approach learning a new technology?",
        "Tell me about a time you led a team.",
        "Explain how you optimize code for performance.",
        "Give an example of a time you worked under a tight deadline.",
        "Describe a situation where you had to debug production issues.",
        "Tell me about a time you had a conflict in a team and how you resolved it.",
        "Explain a project where you implemented new features from scratch.",
        "Describe a time you had to learn something quickly to complete a task."
    ]

    def __init__(self):
        self.question_index = 0

    async def stream_generate(self, system_prompt, prompt, conversation_history=[], temperature=0.3):
        # Determine which question to send
        if self.question_index < len(self.first_questions):
            reply = self.first_questions[self.question_index]
        else:
            import random
            reply = random.choice(self.questions_pool)

        self.question_index += 1

        # Stream in chunks
        for i in range(0, len(reply), 12):
            await asyncio.sleep(0.03)
            yield reply[i:i+12]


# Optional: Keep OpenAIAdapter if you want to restore real LLM later
try:
    import os
    import openai
    openai.api_key = os.getenv("OPENAI_API_KEY")

    class OpenAIAdapter(LLMAdapter):
        async def stream_generate(
            self,
            system_prompt: str,
            prompt: str,
            conversation_history: List[Tuple[str, str]] = [],
            temperature: float = 0.3
        ) -> AsyncGenerator[str, None]:
            messages = [{"role": "system", "content": system_prompt}]
            for speaker, text in conversation_history:
                role = "user" if speaker == "user" else "assistant"
                messages.append({"role": role, "content": text})

            messages.append({"role": "user", "content": prompt})

            # async streaming
            stream = await openai.ChatCompletion.acreate(
                model="gpt-3.5-turbo",
                messages=messages,
                temperature=temperature,
                stream=True
            )

            async for event in stream:
                delta = event['choices'][0]['delta']
                if 'content' in delta:
                    yield delta['content']

except ImportError:
    # OpenAI not installed, we just rely on MockLLMAdapter
    pass
