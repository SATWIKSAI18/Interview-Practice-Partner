import { NextRequest, NextResponse } from 'next/server';
import { InterviewFeedback, InterviewSession } from '@/lib/types';
import { generateFeedback } from '@/lib/feedbackGenerator';

export async function POST(request: NextRequest) {
  try {
    const { session } = await request.json();

    if (!session || !session.messages) {
      return NextResponse.json(
        { error: 'Invalid session data' },
        { status: 400 }
      );
    }

    const feedback: InterviewFeedback = generateFeedback(
      session.messages,
      session.jobRole
    );

    return NextResponse.json({ feedback });
  } catch (error: any) {
    console.error('Feedback API error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred generating feedback' },
      { status: 500 }
    );
  }
}
