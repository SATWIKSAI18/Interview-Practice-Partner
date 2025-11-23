'use client';
import React from 'react';

type StaticFeedback = {
  summary: string;
  communication: number;
  technical: number;
  behavioral: number;
};

export default function StaticFeedbackDemo() {
  const feedback: StaticFeedback = {
    summary: "Great job overall! You demonstrated strong technical and communication skills.",
    communication: 4,
    technical: 5,
    behavioral: 3,
  };

  const handleStartNew = () => {
    alert("Starting a new interview (demo)!");
    // Here you can reset state or redirect if needed
  };

  return (
    <div className="p-6 max-w-3xl mx-auto border rounded shadow bg-gray-50 mt-6">
      <h1 className="text-2xl font-bold mb-4">Interview Feedback (Demo)</h1>

      <div className="mb-4">
        <h2 className="font-semibold">Overall Summary</h2>
        <p>{feedback.summary}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <div className="p-3 border rounded bg-white">
          <h3 className="font-semibold">Communication</h3>
          <p>Score: {feedback.communication} / 5</p>
        </div>
        <div className="p-3 border rounded bg-white">
          <h3 className="font-semibold">Technical</h3>
          <p>Score: {feedback.technical} / 5</p>
        </div>
        <div className="p-3 border rounded bg-white">
          <h3 className="font-semibold">Behavioral</h3>
          <p>Score: {feedback.behavioral} / 5</p>
        </div>
      </div>

      <button
        onClick={handleStartNew}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Start New Interview
      </button>
    </div>
  );
}
