import { InterviewQuestion, JobRole } from './interviewQuestions';
import { InterviewMessage } from './types';

export function generateFollowUpQuestion(
  originalQuestion: InterviewQuestion,
  userAnswer: string,
  followUpPrompt?: string
): string {
  const wordCount = userAnswer.split(/\s+/).length;
  const answerLower = userAnswer.toLowerCase();
  
  // Analyze answer for key indicators
  const hasExamples = answerLower.includes('example') || answerLower.includes('for instance') || 
                      answerLower.includes('such as') || answerLower.includes('like when');
  const hasDetails = wordCount > 50;
  const mentionsTechnologies = answerLower.match(/\b(react|javascript|python|java|sql|api|database|framework|tool|technology)\b/i);
  const mentionsExperience = answerLower.match(/\b(worked|experience|project|team|company|role|responsibility)\b/i);
  
  // Generate contextual follow-up based on answer
  if (wordCount < 30) {
    // Very brief answer - ask for more detail
    if (followUpPrompt) {
      if (followUpPrompt.includes('technologies')) {
        return "Can you tell me more about the specific technologies you've worked with?";
      } else if (followUpPrompt.includes('examples')) {
        return "Could you provide a specific example to illustrate that?";
      } else if (followUpPrompt.includes('process')) {
        return "I'd like to understand your process better. Can you walk me through the steps you took?";
      }
    }
    return "That's interesting. Can you elaborate on that and provide more details?";
  } else if (wordCount < 60 && !hasExamples) {
    // Moderate answer without examples
    return "Thank you for that overview. Can you give me a concrete example from your experience?";
  } else if (mentionsTechnologies && !hasDetails) {
    // Mentions tech but lacks depth
    return "You mentioned some technologies. Can you tell me more about how you've used them in practice?";
  } else if (mentionsExperience && !hasExamples) {
    // Mentions experience but no examples
    return "You mentioned your experience. Can you share a specific project or situation where you applied this?";
  } else if (followUpPrompt) {
    // Use the specific follow-up prompt
    if (followUpPrompt.includes('technologies')) {
      return "Can you tell me more about the specific technologies or tools you mentioned?";
    } else if (followUpPrompt.includes('process') || followUpPrompt.includes('approach')) {
      return "I'd like to understand your approach better. Can you walk me through your thought process?";
    } else if (followUpPrompt.includes('examples')) {
      return "That's helpful. Can you provide a specific example of how you've handled this?";
    } else if (followUpPrompt.includes('trade-offs')) {
      return "You mentioned your solution. What were some trade-offs you considered, and why did you choose this approach?";
    }
  }
  
  // Default follow-up
  return "That's interesting. Can you tell me more about that?";
}

export function generateInterviewGreeting(jobRole: JobRole): string {
  const greetings = [
    `Thank you for taking the time to speak with me today. I'm excited to learn more about your background and experience. Let's start with a question about yourself.`,
    `Hello! Thank you for joining me today. I'm looking forward to our conversation. To begin, I'd like to get to know you better.`,
    `Good to meet you! I appreciate you taking the time for this interview. Let's start by learning a bit about your background.`,
  ];
  
  return greetings[Math.floor(Math.random() * greetings.length)];
}

export function generateQuestionIntroduction(question: InterviewQuestion, isFirst: boolean): string {
  if (isFirst) {
    return generateInterviewGreeting(question.category as any);
  }
  
  const transitions = [
    "Great, thank you for that answer.",
    "I appreciate you sharing that.",
    "That's very helpful, thank you.",
    "Thank you for that detailed response.",
  ];
  
  return transitions[Math.floor(Math.random() * transitions.length)];
}

