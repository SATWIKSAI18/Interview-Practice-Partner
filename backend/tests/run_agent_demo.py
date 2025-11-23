# small demo script to run the websocket interaction via an emulated client
import asyncio
import websockets
import json


async def run():
    uri = "ws://localhost:8000/interview/ws"
    async with websockets.connect(uri) as ws:
        # should receive session_created first
        created = await ws.recv()
        print("SERVER:", created)

        # start interview
        await ws.send(json.dumps({
            "type": "start_interview",
            "role": "engineer",
            "mode": "chat"
        }))

        print("SERVER:", await ws.recv())

        # send a user message
        await ws.send(json.dumps({
            "type": "user_message",
            "message": "I would store the mapping in a key-value store..."
        }))

        # receive streaming
        while True:
            resp = await ws.recv()
            print("STREAM:", resp)
            data = json.loads(resp)
            if data.get("type") == "stream_end":
                break

        # end interview
        await ws.send(json.dumps({"type": "end_interview"}))
        print("SERVER:", await ws.recv())


if __name__ == '__main__':
    asyncio.run(run())
