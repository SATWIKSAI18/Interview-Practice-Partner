import { JobRole } from './interviewQuestions';

export type { JobRole };

export interface InterviewMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface InterviewSession {
  id: string;
  jobRole: JobRole;
  messages: InterviewMessage[];
  currentQuestionIndex: number;
  startedAt: Date;
  endedAt?: Date;
}

export interface InterviewFeedback {
  communication: {
    score: number;
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
  technical: {
    score: number;
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
  behavioral: {
    score: number;
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
  overall: {
    score: number;
    summary: string;
    keyStrengths: string[];
    areasForImprovement: string[];
    nextSteps: string[];
  };
}

