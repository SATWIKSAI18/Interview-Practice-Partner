# AI Interview Practice Partner

A comprehensive AI-powered interview practice application that helps users prepare for real-world job interviews through realistic mock interviews with detailed feedback.

## Features

### ✅ Core Features

- **Role-Specific Mock Interviews**: Conduct realistic mock interviews for specific job roles:
  - Software Engineer
  - Sales Representative
  - Retail Associate
  - Data Scientist
  - Product Manager
  - Marketing Manager
  - Customer Service
  - Project Manager

- **Intelligent Follow-Up Questions**: The AI interviewer asks meaningful follow-up questions just like a real interviewer would:
  - Explores answers in depth
  - Asks for clarification when needed
  - Dives deeper into technical concepts
  - Shows genuine interest and engagement
  - Natural, conversational flow

- **Comprehensive Post-Interview Feedback**: Detailed analysis covering:
  - **Communication Skills**: Clarity, articulation, and professional communication
  - **Technical Knowledge**: Depth of understanding, problem-solving abilities
  - **Behavioral Performance**: Examples, storytelling, and situational responses
  - **Strengths**: What you did well
  - **Areas for Improvement**: Specific, actionable feedback
  - **Personalized Suggestions**: Tailored next steps for improvement

- **Dual Interaction Modes**:
  - **Voice Input (Preferred)**: Use your microphone for the most realistic interview experience
  - **Text Input (Fallback)**: Type your answers if voice is unavailable or preferred
  - Seamless switching between modes
  - Text-to-speech for interviewer questions

### 🎨 Enhanced UI/UX

- Beautiful, modern interface with smooth animations
- Real-time interview timer and progress tracking
- Visual indicators for follow-up questions
- Interactive tips and guidance
- Responsive design for all devices
- Professional color scheme and gradients

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Local AI Logic** - Intelligent interview flow and feedback generation (no external APIs required)
- **Web Speech API** - Voice input/output

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

**Note:** This application works completely offline without any external APIs or API keys required!

## Usage

1. **Select a Job Role**: Choose from 8+ available positions on the home page
2. **Start Interview**: Click "Start Interview" to begin your mock interview
3. **Answer Questions**: 
   - **Recommended**: Use voice input by clicking the microphone icon
   - **Alternative**: Type your answers in the text input field
4. **Follow-Up Questions**: The AI interviewer will naturally ask follow-up questions to explore your answers in depth
5. **Complete Interview**: Click "End Interview" when finished (or let it complete naturally)
6. **Review Feedback**: Get comprehensive feedback on:
   - Communication skills
   - Technical knowledge
   - Behavioral performance
   - Specific strengths and areas for improvement
   - Actionable next steps

## Browser Compatibility

- Voice input requires a browser with Web Speech API support (Chrome, Edge, Safari)
- Text input works in all modern browsers
- Voice output (text-to-speech) is supported in most modern browsers

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── interview/route.ts    # Interview flow API
│   │   └── feedback/route.ts     # Feedback generation API
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page
├── components/
│   ├── InterviewInterface.tsx    # Interview UI component
│   └── FeedbackDisplay.tsx       # Feedback display component
├── lib/
│   ├── interviewQuestions.ts     # Question database
│   └── types.ts                  # TypeScript types
└── package.json
```

## License

MIT

