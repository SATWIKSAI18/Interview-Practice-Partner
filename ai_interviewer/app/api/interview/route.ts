import { NextRequest, NextResponse } from 'next/server';
import { interviewQuestions, JobRole } from '@/lib/interviewQuestions';
import { InterviewMessage, InterviewSession } from '@/lib/types';
import { generateFollowUpQuestion, generateQuestionIntroduction } from '@/lib/interviewLogic';

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid request body. Expected JSON.' },
        { status: 400 }
      );
    }
    
    const { action, session, userMessage } = body;

    if (action === 'start') {
      const { jobRole } = body;
      const questions = interviewQuestions[jobRole as JobRole];
      
      if (!questions || questions.length === 0) {
        return NextResponse.json(
          { error: 'Invalid job role' },
          { status: 400 }
        );
      }

      const firstQuestion = questions[0];
      const introduction = generateQuestionIntroduction(firstQuestion, true);
      const question = `${introduction} ${firstQuestion.question}`;

      return NextResponse.json({
        question: question,
        questionId: firstQuestion.id,
        questionIndex: 0,
        isFollowUp: false,
      });
    }

    if (action === 'continue') {
      const { jobRole, messages, currentQuestionIndex } = session;
      const questions = interviewQuestions[jobRole as JobRole];
      const currentQuestion = questions[currentQuestionIndex];

      if (!currentQuestion) {
        return NextResponse.json(
          { error: 'Interview completed' },
          { status: 400 }
        );
      }

      // Determine if we should ask a follow-up or move to next question
      const shouldAskFollowUp = shouldContinueWithFollowUp(
        messages,
        currentQuestionIndex
      );

      let question = '';
      let questionId = '';
      let nextIndex = currentQuestionIndex;

      if (shouldAskFollowUp && currentQuestion.followUpPrompt) {
        // Generate follow-up question
        question = generateFollowUpQuestion(
          currentQuestion,
          userMessage,
          currentQuestion.followUpPrompt
        );
        questionId = currentQuestion.id;
        // Keep same index for follow-up
      } else {
        // Move to next question
        nextIndex = currentQuestionIndex + 1;
        if (nextIndex < questions.length) {
          const nextQuestion = questions[nextIndex];
          const introduction = generateQuestionIntroduction(nextQuestion, false);
          question = `${introduction} ${nextQuestion.question}`;
          questionId = nextQuestion.id;
        } else {
          // Interview complete
          return NextResponse.json({
            completed: true,
            message: 'Thank you for participating in this interview. The interview is now complete.',
          });
        }
      }

      return NextResponse.json({
        question: question,
        questionId: questionId,
        questionIndex: nextIndex,
        isFollowUp: shouldAskFollowUp,
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Interview API error:', error);
    
    let errorMessage = 'An error occurred while starting the interview.';
    
    if (error.message) {
      errorMessage = `Error: ${error.message}`;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

function shouldContinueWithFollowUp(
  messages: InterviewMessage[],
  currentQuestionIndex: number
): boolean {
  // Get the last user message
  const lastUserMessage = messages
    .filter(m => m.role === 'user')
    .slice(-1)[0];

  if (!lastUserMessage) return false;

  // Count words in the answer
  const wordCount = lastUserMessage.content.split(/\s+/).length;
  
  // Count how many assistant messages we've had for this question
  const recentAssistantMessages = messages
    .filter(m => m.role === 'assistant')
    .slice(-3);
  
  const hasAskedFollowUp = recentAssistantMessages.length >= 2;
  
  // Ask follow-up if answer is brief or if we haven't asked one yet
  if (wordCount < 30) {
    return !hasAskedFollowUp;
  } else if (wordCount < 60) {
    return !hasAskedFollowUp;
  } else {
    // Ask one thoughtful follow-up even for longer answers
    return !hasAskedFollowUp;
  }
}
