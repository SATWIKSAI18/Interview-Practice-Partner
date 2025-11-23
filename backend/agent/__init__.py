from agent.agent import InterviewAgent
from agent.llm_adapter import MockLLMAdapter

agent = InterviewAgent(llm_adapter=MockLLMAdapter())
