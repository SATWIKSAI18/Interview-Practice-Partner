'use client';
import React from 'react';
import { InterviewFeedback } from '@/lib/types';

type Props = {
  feedback: InterviewFeedback;
  onStartNew: () => void;
};

export default function FeedbackDisplay({ feedback, onStartNew }: Props) {
  return (
    <div className="p-6 max-w-3xl mx-auto border rounded shadow bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Interview Feedback</h1>

      <div className="mb-4">
        <h2 className="font-semibold">Overall Summary</h2>
        <p>{feedback.overall.summary}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <div>
          <h3 className="font-semibold">Communication</h3>
          <p>Score: {feedback.communication.score}</p>
        </div>
        <div>
          <h3 className="font-semibold">Technical</h3>
          <p>Score: {feedback.technical.score}</p>
        </div>
        <div>
          <h3 className="font-semibold">Behavioral</h3>
          <p>Score: {feedback.behavioral.score}</p>
        </div>
      </div>

      <button
        onClick={onStartNew}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Start New Interview
      </button>
    </div>
  );
}
