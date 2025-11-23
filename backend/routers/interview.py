# interview.py
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import uuid
from agent.agent import InterviewAgent
from agent.session import Session
import asyncio

router = APIRouter(prefix="/interview")

# Initialize agent
agent = InterviewAgent()

sessions: dict[str, Session] = {}  # session_id -> Session

@router.websocket("/ws")
async def interview_socket(websocket: WebSocket):
    await websocket.accept()
    session_id = str(uuid.uuid4())
    sessions[session_id] = agent.create_session()
    session = sessions[session_id]

    await websocket.send_json({"type": "session_created", "session_id": session_id})

    try:
        while True:
            data = await websocket.receive_json()
            msg_type = data.get("type")

            if msg_type == "start_interview":
                role = data.get("role", "engineer")
                session.role = role
                session.question_index = 0

                # Send first question
                async for chunk in agent.handle_user_response_and_stream(session, "__start__", first_question=True):
                    await websocket.send_json({"type": "ai_question", "question": chunk})

            elif msg_type == "user_message":
                user_text = data.get("message", "")
                # Send next question
                async for chunk in agent.handle_user_response_and_stream(session, user_text):
                    await websocket.send_json({"type": "ai_question", "question": chunk})

            elif msg_type == "end_interview":
                feedback = agent.end_interview_and_get_feedback(session)
                await websocket.send_json({"type": "feedback", "payload": feedback})
                break

            else:
                await websocket.send_json({"type": "error", "message": "Unknown type"})

    except WebSocketDisconnect:
        print(f"Client disconnected: {session_id}")
    finally:
        sessions.pop(session_id, None)
