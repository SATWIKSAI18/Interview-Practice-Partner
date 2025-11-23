export type JobRole = 
  | 'software-engineer'
  | 'sales-representative'
  | 'retail-associate'
  | 'data-scientist'
  | 'product-manager'
  | 'marketing-manager'
  | 'customer-service'
  | 'project-manager';

export interface InterviewQuestion {
  id: string;
  question: string;
  category: 'technical' | 'behavioral' | 'situational';
  followUpPrompt?: string;
}

export const interviewQuestions: Record<JobRole, InterviewQuestion[]> = {
  'software-engineer': [
    {
      id: 'se-1',
      question: 'Tell me about yourself and your experience with software development.',
      category: 'behavioral',
      followUpPrompt: 'Ask about specific technologies, projects, or challenges they mentioned.'
    },
    {
      id: 'se-2',
      question: 'Describe a challenging technical problem you solved recently. What was your approach?',
      category: 'technical',
      followUpPrompt: 'Dive deeper into their problem-solving process, ask about trade-offs, and explore alternative solutions.'
    },
    {
      id: 'se-3',
      question: 'How do you handle code reviews and feedback from your peers?',
      category: 'behavioral',
      followUpPrompt: 'Ask for specific examples and how they incorporate feedback.'
    },
    {
      id: 'se-4',
      question: 'Explain the difference between REST and GraphQL. When would you choose one over the other?',
      category: 'technical',
      followUpPrompt: 'Ask about their experience with both, and explore real-world use cases.'
    },
    {
      id: 'se-5',
      question: 'Tell me about a time you had to work under pressure to meet a deadline. How did you manage it?',
      category: 'situational',
      followUpPrompt: 'Explore their time management, prioritization, and communication strategies.'
    },
  ],
  'sales-representative': [
    {
      id: 'sr-1',
      question: 'Tell me about yourself and your experience in sales.',
      category: 'behavioral',
      followUpPrompt: 'Ask about their sales achievements, targets, and specific industries they\'ve worked in.'
    },
    {
      id: 'sr-2',
      question: 'Walk me through your sales process from initial contact to closing a deal.',
      category: 'technical',
      followUpPrompt: 'Dive deeper into each stage, ask about tools they use, and explore how they handle objections.'
    },
    {
      id: 'sr-3',
      question: 'Describe a time when you lost a sale. What did you learn from that experience?',
      category: 'behavioral',
      followUpPrompt: 'Explore their reflection process and how they applied those lessons to future sales.'
    },
    {
      id: 'sr-4',
      question: 'How do you build rapport with potential clients?',
      category: 'technical',
      followUpPrompt: 'Ask for specific techniques and examples of successful relationship building.'
    },
    {
      id: 'sr-5',
      question: 'Tell me about a time you had to handle a difficult customer. How did you resolve the situation?',
      category: 'situational',
      followUpPrompt: 'Explore their conflict resolution skills and customer service approach.'
    },
  ],
  'retail-associate': [
    {
      id: 'ra-1',
      question: 'Tell me about yourself and why you\'re interested in retail.',
      category: 'behavioral',
      followUpPrompt: 'Ask about their customer service experience and what draws them to retail work.'
    },
    {
      id: 'ra-2',
      question: 'How would you handle a customer who is unhappy with a product they purchased?',
      category: 'situational',
      followUpPrompt: 'Explore their problem-solving approach and customer service philosophy.'
    },
    {
      id: 'ra-3',
      question: 'Describe a time when you had to work as part of a team to achieve a goal.',
      category: 'behavioral',
      followUpPrompt: 'Ask about their role in the team and how they contributed to success.'
    },
    {
      id: 'ra-4',
      question: 'How do you stay motivated during slow periods in the store?',
      category: 'behavioral',
      followUpPrompt: 'Explore their initiative and ability to find productive tasks.'
    },
    {
      id: 'ra-5',
      question: 'Tell me about a time you had to multitask while helping multiple customers.',
      category: 'situational',
      followUpPrompt: 'Ask about their prioritization skills and how they ensure all customers feel valued.'
    },
  ],
  'data-scientist': [
    {
      id: 'ds-1',
      question: 'Tell me about yourself and your background in data science.',
      category: 'behavioral',
      followUpPrompt: 'Ask about specific projects, tools, and methodologies they\'ve used.'
    },
    {
      id: 'ds-2',
      question: 'Explain the difference between supervised and unsupervised learning. Provide examples of each.',
      category: 'technical',
      followUpPrompt: 'Dive deeper into algorithms, ask about their experience with specific models, and explore use cases.'
    },
    {
      id: 'ds-3',
      question: 'Describe a data science project you worked on from start to finish.',
      category: 'technical',
      followUpPrompt: 'Explore their methodology, challenges faced, and how they validated their results.'
    },
    {
      id: 'ds-4',
      question: 'How do you handle missing or incomplete data in your analysis?',
      category: 'technical',
      followUpPrompt: 'Ask about specific techniques and when they would use different approaches.'
    },
    {
      id: 'ds-5',
      question: 'Tell me about a time you had to explain a complex data concept to a non-technical stakeholder.',
      category: 'behavioral',
      followUpPrompt: 'Explore their communication skills and ability to translate technical concepts.'
    },
  ],
  'product-manager': [
    {
      id: 'pm-1',
      question: 'Tell me about yourself and your experience in product management.',
      category: 'behavioral',
      followUpPrompt: 'Ask about specific products they\'ve managed and their approach to product development.'
    },
    {
      id: 'pm-2',
      question: 'How do you prioritize features for a product roadmap?',
      category: 'technical',
      followUpPrompt: 'Explore their framework, ask about trade-offs, and how they balance stakeholder needs.'
    },
    {
      id: 'pm-3',
      question: 'Describe a time when you had to make a difficult product decision with limited information.',
      category: 'situational',
      followUpPrompt: 'Explore their decision-making process and how they mitigated risks.'
    },
    {
      id: 'pm-4',
      question: 'How do you gather and incorporate user feedback into product development?',
      category: 'technical',
      followUpPrompt: 'Ask about specific methods, tools, and how they balance different user needs.'
    },
    {
      id: 'pm-5',
      question: 'Tell me about a product launch you managed. What challenges did you face?',
      category: 'behavioral',
      followUpPrompt: 'Explore their project management skills and how they handled unexpected issues.'
    },
  ],
  'marketing-manager': [
    {
      id: 'mm-1',
      question: 'Tell me about yourself and your experience in marketing.',
      category: 'behavioral',
      followUpPrompt: 'Ask about specific campaigns, channels, and industries they\'ve worked in.'
    },
    {
      id: 'mm-2',
      question: 'How do you measure the success of a marketing campaign?',
      category: 'technical',
      followUpPrompt: 'Explore their metrics, analytics tools, and how they attribute results.'
    },
    {
      id: 'mm-3',
      question: 'Describe a marketing campaign that didn\'t perform as expected. What did you learn?',
      category: 'behavioral',
      followUpPrompt: 'Ask about their analysis process and how they applied those insights.'
    },
    {
      id: 'mm-4',
      question: 'How do you stay current with marketing trends and new platforms?',
      category: 'behavioral',
      followUpPrompt: 'Explore their learning approach and adaptability.'
    },
    {
      id: 'mm-5',
      question: 'Tell me about a time you had to manage a marketing budget with limited resources.',
      category: 'situational',
      followUpPrompt: 'Explore their prioritization and resource allocation strategies.'
    },
  ],
  'customer-service': [
    {
      id: 'cs-1',
      question: 'Tell me about yourself and your experience in customer service.',
      category: 'behavioral',
      followUpPrompt: 'Ask about specific industries, types of customers, and challenges they\'ve handled.'
    },
    {
      id: 'cs-2',
      question: 'How do you handle an angry or frustrated customer?',
      category: 'situational',
      followUpPrompt: 'Explore their de-escalation techniques and empathy skills.'
    },
    {
      id: 'cs-3',
      question: 'Describe a time when you went above and beyond for a customer.',
      category: 'behavioral',
      followUpPrompt: 'Ask about the impact and how they balanced customer needs with company policies.'
    },
    {
      id: 'cs-4',
      question: 'How do you manage multiple customer inquiries simultaneously?',
      category: 'situational',
      followUpPrompt: 'Explore their time management and prioritization skills.'
    },
    {
      id: 'cs-5',
      question: 'Tell me about a time you had to say no to a customer request. How did you handle it?',
      category: 'situational',
      followUpPrompt: 'Explore their communication skills and ability to maintain positive relationships.'
    },
  ],
  'project-manager': [
    {
      id: 'pm2-1',
      question: 'Tell me about yourself and your experience in project management.',
      category: 'behavioral',
      followUpPrompt: 'Ask about specific projects, methodologies (Agile, Waterfall, etc.), and industries.'
    },
    {
      id: 'pm2-2',
      question: 'How do you handle scope creep in a project?',
      category: 'situational',
      followUpPrompt: 'Explore their change management process and stakeholder communication.'
    },
    {
      id: 'pm2-3',
      question: 'Describe a project that was behind schedule. How did you get it back on track?',
      category: 'behavioral',
      followUpPrompt: 'Ask about their problem-solving approach and resource management.'
    },
    {
      id: 'pm2-4',
      question: 'How do you communicate project status to stakeholders?',
      category: 'technical',
      followUpPrompt: 'Explore their reporting methods and how they tailor communication to different audiences.'
    },
    {
      id: 'pm2-5',
      question: 'Tell me about a time you had to manage a difficult team member.',
      category: 'situational',
      followUpPrompt: 'Explore their leadership and conflict resolution skills.'
    },
  ],
};

export const roleDisplayNames: Record<JobRole, string> = {
  'software-engineer': 'Software Engineer',
  'sales-representative': 'Sales Representative',
  'retail-associate': 'Retail Associate',
  'data-scientist': 'Data Scientist',
  'product-manager': 'Product Manager',
  'marketing-manager': 'Marketing Manager',
  'customer-service': 'Customer Service',
  'project-manager': 'Project Manager',
};

