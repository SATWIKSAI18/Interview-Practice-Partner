import { InterviewFeedback, InterviewMessage } from './types';
import { JobRole } from './interviewQuestions';

export function generateFeedback(
  messages: InterviewMessage[],
  jobRole: JobRole
): InterviewFeedback {
  const userMessages = messages.filter(m => m.role === 'user');
  const assistantMessages = messages.filter(m => m.role === 'assistant');
  
  // Analyze answers
  const totalAnswers = userMessages.length;
  const avgAnswerLength = userMessages.reduce((sum, msg) => sum + msg.content.split(/\s+/).length, 0) / totalAnswers || 0;
  const longestAnswer = Math.max(...userMessages.map(m => m.content.split(/\s+/).length), 0);
  const shortestAnswer = Math.min(...userMessages.map(m => m.content.split(/\s+/).length), 0);
  
  // Check for key indicators
  const hasExamples = userMessages.some(m => 
    m.content.toLowerCase().includes('example') || 
    m.content.toLowerCase().includes('for instance') ||
    m.content.toLowerCase().includes('such as')
  );
  
  const hasTechnicalTerms = userMessages.some(m => {
    const techTerms = ['api', 'database', 'framework', 'algorithm', 'system', 'architecture', 'code', 'development'];
    return techTerms.some(term => m.content.toLowerCase().includes(term));
  });
  
  const hasExperience = userMessages.some(m => {
    const expTerms = ['worked', 'experience', 'project', 'team', 'company', 'role', 'responsibility', 'achieved'];
    return expTerms.some(term => m.content.toLowerCase().includes(term));
  });
  
  // Calculate scores
  let communicationScore = 70;
  let technicalScore = 60;
  let behavioralScore = 65;
  
  // Communication scoring
  if (avgAnswerLength > 50) communicationScore += 10;
  if (avgAnswerLength > 80) communicationScore += 5;
  if (avgAnswerLength < 30) communicationScore -= 15;
  if (hasExamples) communicationScore += 10;
  if (totalAnswers > 3) communicationScore += 5;
  
  // Technical scoring
  if (hasTechnicalTerms) technicalScore += 15;
  if (avgAnswerLength > 60) technicalScore += 10;
  if (hasExamples) technicalScore += 10;
  
  // Behavioral scoring
  if (hasExperience) behavioralScore += 15;
  if (hasExamples) behavioralScore += 10;
  if (avgAnswerLength > 50) behavioralScore += 10;
  
  // Normalize scores
  communicationScore = Math.min(100, Math.max(40, communicationScore));
  technicalScore = Math.min(100, Math.max(40, technicalScore));
  behavioralScore = Math.min(100, Math.max(40, behavioralScore));
  
  const overallScore = Math.round((communicationScore + technicalScore + behavioralScore) / 3);
  
  // Generate strengths and weaknesses
  const communicationStrengths: string[] = [];
  const communicationWeaknesses: string[] = [];
  const communicationSuggestions: string[] = [];
  
  if (avgAnswerLength > 50) {
    communicationStrengths.push('You provided detailed and comprehensive answers');
  } else {
    communicationWeaknesses.push('Your answers could be more detailed and comprehensive');
    communicationSuggestions.push('Try to expand on your answers with more context and examples');
  }
  
  if (hasExamples) {
    communicationStrengths.push('You effectively used examples to illustrate your points');
  } else {
    communicationWeaknesses.push('You could benefit from using more concrete examples');
    communicationSuggestions.push('Practice incorporating specific examples from your experience into your answers');
  }
  
  if (avgAnswerLength < 30) {
    communicationWeaknesses.push('Your answers were quite brief');
    communicationSuggestions.push('Aim for 50-100 words per answer to provide sufficient detail');
  }
  
  if (communicationStrengths.length === 0) {
    communicationStrengths.push('You maintained a professional tone throughout');
  }
  
  // Technical feedback
  const technicalStrengths: string[] = [];
  const technicalWeaknesses: string[] = [];
  const technicalSuggestions: string[] = [];
  
  if (hasTechnicalTerms) {
    technicalStrengths.push('You demonstrated familiarity with technical concepts');
  } else {
    technicalWeaknesses.push('You could demonstrate more technical knowledge');
    technicalSuggestions.push('Prepare to discuss specific technologies and tools relevant to the role');
  }
  
  if (avgAnswerLength > 60) {
    technicalStrengths.push('You provided thorough technical explanations');
  } else {
    technicalWeaknesses.push('Technical explanations could be more detailed');
    technicalSuggestions.push('Practice explaining technical concepts in depth');
  }
  
  if (technicalStrengths.length === 0) {
    technicalStrengths.push('You showed willingness to engage with technical topics');
  }
  
  // Behavioral feedback
  const behavioralStrengths: string[] = [];
  const behavioralWeaknesses: string[] = [];
  const behavioralSuggestions: string[] = [];
  
  if (hasExperience) {
    behavioralStrengths.push('You drew from your past experience effectively');
  } else {
    behavioralWeaknesses.push('You could reference more specific experiences');
    behavioralSuggestions.push('Prepare specific examples from your work history using the STAR method (Situation, Task, Action, Result)');
  }
  
  if (hasExamples) {
    behavioralStrengths.push('You used examples to support your answers');
  } else {
    behavioralWeaknesses.push('More concrete examples would strengthen your answers');
    behavioralSuggestions.push('Practice telling stories about your experiences');
  }
  
  if (behavioralStrengths.length === 0) {
    behavioralStrengths.push('You maintained a positive and professional demeanor');
  }
  
  // Overall feedback
  const keyStrengths: string[] = [];
  const areasForImprovement: string[] = [];
  const nextSteps: string[] = [];
  
  if (communicationScore >= 75) keyStrengths.push('Strong communication skills');
  if (technicalScore >= 75) keyStrengths.push('Solid technical knowledge');
  if (behavioralScore >= 75) keyStrengths.push('Good use of examples and experience');
  
  if (communicationScore < 70) areasForImprovement.push('Enhance answer detail and clarity');
  if (technicalScore < 70) areasForImprovement.push('Deepen technical explanations');
  if (behavioralScore < 70) areasForImprovement.push('Incorporate more specific examples');
  
  if (avgAnswerLength < 40) {
    nextSteps.push('Practice giving longer, more detailed answers (aim for 50-100 words)');
  }
  if (!hasExamples) {
    nextSteps.push('Prepare 3-5 specific examples from your experience using the STAR method');
  }
  nextSteps.push('Practice answering common interview questions for your target role');
  nextSteps.push('Record yourself answering questions and review for clarity and completeness');
  
  const summary = `You completed the interview with an overall score of ${overallScore}/100. ${
    overallScore >= 80 ? 'Excellent work! You demonstrated strong interview skills.' :
    overallScore >= 65 ? 'Good performance overall. There are some areas where you can improve.' :
    'You have a solid foundation. With practice, you can significantly improve your interview performance.'
  } ${
    avgAnswerLength > 50 ? 'Your answers were detailed and comprehensive.' :
    'Consider providing more detailed answers in future interviews.'
  } ${
    hasExamples ? 'You effectively used examples to support your points.' :
    'Try to incorporate more specific examples from your experience.'
  } Continue practicing to build confidence and refine your responses.`;
  
  return {
    communication: {
      score: Math.round(communicationScore),
      strengths: communicationStrengths.length > 0 ? communicationStrengths : ['Professional communication style'],
      weaknesses: communicationWeaknesses.length > 0 ? communicationWeaknesses : ['Room for improvement in answer depth'],
      suggestions: communicationSuggestions.length > 0 ? communicationSuggestions : ['Practice articulating your thoughts more clearly'],
    },
    technical: {
      score: Math.round(technicalScore),
      strengths: technicalStrengths.length > 0 ? technicalStrengths : ['Willingness to engage with technical topics'],
      weaknesses: technicalWeaknesses.length > 0 ? technicalWeaknesses : ['Could demonstrate more technical depth'],
      suggestions: technicalSuggestions.length > 0 ? technicalSuggestions : ['Study relevant technical concepts for your target role'],
    },
    behavioral: {
      score: Math.round(behavioralScore),
      strengths: behavioralStrengths.length > 0 ? behavioralStrengths : ['Professional demeanor'],
      weaknesses: behavioralWeaknesses.length > 0 ? behavioralWeaknesses : ['Could use more specific examples'],
      suggestions: behavioralSuggestions.length > 0 ? behavioralSuggestions : ['Prepare stories using the STAR method'],
    },
    overall: {
      score: overallScore,
      summary,
      keyStrengths: keyStrengths.length > 0 ? keyStrengths : ['Professional approach', 'Clear communication'],
      areasForImprovement: areasForImprovement.length > 0 ? areasForImprovement : ['Answer depth', 'Example usage'],
      nextSteps,
    },
  };
}

