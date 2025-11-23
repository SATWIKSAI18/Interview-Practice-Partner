'use client';
import { useEffect, useRef, useState } from 'react';
import { InterviewFeedback } from '@/lib/types';

// Import the static feedback component
import StaticFeedbackDemo from './StaticFeedbackDemo'; // adjust the path if needed

type Props = {
  jobRole: string;
  onEndInterview: (session: {
    id: string;
    messages: string[];
    feedback?: any; // optional feedback object
  }) => void;
};

const backendRoleMap: Record<string, string> = {
  "software-engineer": "engineer",
  "sales-representative": "sales-representative"
  // add more mappings if needed
};

export default function InterviewInterface({ jobRole, onEndInterview }: Props) {
  const [feedback, setFeedback] = useState<InterviewFeedback | null>(null);
  const [ended, setEnded] = useState(false); // NEW: track if interview ended
  const socketRef = useRef<WebSocket | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Speech recognition setup
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      console.warn('Speech Recognition API not supported in this browser.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      setInput(transcript); // update input field as user speaks
    };

    recognition.onerror = (err: any) => console.error('Speech recognition error:', err);

    recognitionRef.current = recognition;
  }, []);

  // Connect WebSocket
  useEffect(() => {
    const ws = new WebSocket('ws://127.0.0.1:8000/interview/ws');

    ws.onopen = () => console.log('WebSocket connected');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('WS MESSAGE', data);

      if (data.type === 'session_created') setSessionId(data.session_id);

      if (data.type === 'system') appendMessage('system', data.message);

      if (data.type === 'ai_question') {
        appendMessage('ai', data.question);
        speakText(data.question); // AI reads question aloud
      }

      if (data.type === 'stream') appendMessage('ai', data.chunk, true);

      if (data.type === 'stream_end') appendMessage('ai', '\n--- response complete ---\n');

      if (data.type === 'feedback') {
        const wsFeedback: InterviewFeedback = data.payload;
        setFeedback(wsFeedback);

        if (sessionId) {
          onEndInterview({
            id: sessionId,
            messages: messages.map((m) => m.text),
            feedback: wsFeedback,
          });
        }
      }

      if (data.type === 'error') appendMessage('system', data.message);
    };

    ws.onerror = (err) => console.error('WebSocket error:', err);
    ws.onclose = () => console.log('WebSocket closed');

    socketRef.current = ws;
    return () => ws.close();
  }, []); // <-- WS opens only once

  const appendMessage = (sender: string, text: string, streaming = false) => {
    setMessages((prev) => {
      if (streaming && prev.length && prev[prev.length - 1].sender === 'ai') {
        const updated = [...prev];
        updated[prev.length - 1].text += text;
        return updated;
      }
      return [...prev, { sender, text }];
    });
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const startInterview = () => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;
    const backendRole = backendRoleMap[jobRole] || "engineer";
    console.log("Starting interview with role:", backendRole);
    socketRef.current.send(JSON.stringify({ type: 'start_interview', role: backendRole }));
  };

  const sendMessage = () => {
    if (!input.trim() || !socketRef.current) return;
    appendMessage('user', input);
    socketRef.current.send(JSON.stringify({ type: 'user_message', message: input }));
    setInput('');
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const endInterview = () => {
    setEnded(true); // NEW: show static feedback instead of live backend feedback
  };

  // RENDER
  if (ended) {
    return <StaticFeedbackDemo />; // NEW: show static feedback page after interview ends
  }

  return (
    <div className="p-6 max-w-3xl mx-auto border rounded shadow">
      <h1 className="text-2xl font-bold mb-3">AI Interview - {jobRole}</h1>

      <button onClick={startInterview} className="px-4 py-2 bg-blue-600 text-white rounded mb-2">
        Start Interview
      </button>

      <div className="mt-4 p-3 border h-80 overflow-auto bg-gray-50 rounded">
        {messages.map((msg, idx) => (
          <p key={idx} className={msg.sender === 'user' ? 'text-blue-700' : 'text-black'}>
            <strong>{msg.sender}: </strong>{msg.text}
          </p>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          className="border p-2 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your answer..."
        />
        <button className="bg-blue-600 px-4 py-2 text-white rounded" onClick={sendMessage}>
          Send
        </button>
        <button
          onClick={toggleListening}
          className={`px-4 py-2 rounded text-white ${isListening ? 'bg-red-600' : 'bg-green-600'}`}
        >
          {isListening ? 'Stop Listening' : 'Start Voice'}
        </button>
      </div>

      <button onClick={endInterview} className="mt-4 bg-red-600 px-4 py-2 text-white rounded">
        End Interview
      </button>
    </div>
  );
}
