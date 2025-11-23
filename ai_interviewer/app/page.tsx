'use client';
import { BACKEND_URL } from '@/lib/api';
import { useState } from 'react';
import InterviewInterface from '@/components/InterviewInterface';
import FeedbackDisplay from '@/components/FeedbackDisplay';
import { InterviewSession, InterviewFeedback, JobRole } from '@/lib/types';
import { roleDisplayNames } from '@/lib/interviewQuestions';

type AppState = 'role-selection' | 'interview' | 'feedback';

const roleIcons: Record<JobRole, string> = {
  'software-engineer': '',
  'sales-representative': '',
  'retail-associate': '',
  'data-scientist': '',
  'product-manager': '',
  'marketing-manager': '',
  'customer-service': '',
  'project-manager': '',
};

export default function Home() {
  const [state, setState] = useState<AppState>('role-selection');
  const [selectedRole, setSelectedRole] = useState<JobRole | null>(null);
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [feedback, setFeedback] = useState<InterviewFeedback | null>(null);
  const [hoveredRole, setHoveredRole] = useState<JobRole | null>(null);

  const jobRoles: JobRole[] = [
    'software-engineer',
    'sales-representative',
    'retail-associate',
    'data-scientist',
    'product-manager',
    'marketing-manager',
    'customer-service',
    'project-manager',
  ];

  const handleRoleSelect = (role: JobRole) => {
    setSelectedRole(role);
    setState('interview');
  };

  const handleEndInterview = (interviewSession: { id: string; messages: string[]; feedback?: InterviewFeedback }) => {
  // Map string[] messages to InterviewMessage[]
  const mappedSession: InterviewSession & { feedback?: InterviewFeedback } = {
    ...interviewSession,
    jobRole: selectedRole!, // must exist here
    messages: interviewSession.messages.map(text => ({
      role: 'user', // or 'assistant'? you may adjust if you track roles in Interface
      content: text,
      timestamp: new Date(),
    })),
    currentQuestionIndex: 0,
    startedAt: new Date(),
  };

  setSession(mappedSession);

  if (interviewSession.feedback) {
    setFeedback(interviewSession.feedback);
    setState('feedback');
  }
};



  const handleStartNew = () => {
    setState('role-selection');
    setSelectedRole(null);
    setSession(null);
    setFeedback(null);
  };

  if (state === 'interview' && selectedRole) {
    return <InterviewInterface jobRole={selectedRole} onEndInterview={handleEndInterview} />;
  }

  if (state === 'feedback' && feedback) {
    return <FeedbackDisplay feedback={feedback} onStartNew={handleStartNew} />;
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 md:p-8 animate-fadeIn">
      <div className="max-w-6xl w-full">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-12 border border-white/20">
          {/* Header with animated gradient text */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              AI Interview Practice Partner
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Master your interview skills with AI-powered mock interviews. 
              <span className="block mt-2 text-indigo-600 font-semibold">
                Practice makes perfect!
              </span>
            </p>
          </div>

          {/* Role Selection Grid */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              <span className="text-indigo-600">Select Your Role</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {jobRoles.map((role, index) => (
                <button
                  key={role}
                  onClick={() => handleRoleSelect(role)}
                  onMouseEnter={() => setHoveredRole(role)}
                  onMouseLeave={() => setHoveredRole(null)}
                  className={`group relative p-6 bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-transparent hover:border-indigo-300 overflow-hidden delay-${index * 50}`}
                >
                  {/* Animated background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  
                  <div className="relative text-center z-10">
                    <div className="font-bold text-gray-800 text-sm md:text-base group-hover:text-indigo-600 transition-colors">
                      {roleDisplayNames[role]}
                    </div>
                    {hoveredRole === role && (
                      <div className="mt-2 text-xs text-indigo-600 font-semibold animate-fadeIn">
                        Click to start →
                      </div>
                    )}
                  </div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </button>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 md:p-8 border border-indigo-200/50">
            <h3 className="font-bold text-xl text-gray-800 mb-4">
              How It Works
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { text: 'Choose a job role to practice for' },
                { text: 'Answer questions naturally (voice or text)' },
                { text: 'Receive follow-up questions to explore your answers' },
                { text: 'Get comprehensive feedback on your performance' },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-colors"
                >
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  <span className="text-gray-700 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats/Info Section */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-indigo-50 rounded-xl">
              <div className="text-2xl font-bold text-indigo-600">8+</div>
              <div className="text-sm text-gray-600">Job Roles</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">AI</div>
              <div className="text-sm text-gray-600">Powered</div>
            </div>
            <div className="p-4 bg-pink-50 rounded-xl">
              <div className="text-2xl font-bold text-pink-600">100%</div>
              <div className="text-sm text-gray-600">Free</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

