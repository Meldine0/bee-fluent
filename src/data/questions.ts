export interface Question {
  question: string;
  options: string[];
  correct: number;
  category: string;
}

export const questions: Question[] = [
  {
    question: 'She ___ to school every day.',
    options: ['go', 'goes', 'going'],
    correct: 1,
    category: 'Grammaire',
  },
  {
    question: 'What does "improve" mean?',
    options: ['Make something better', 'Make something worse', 'Stop something'],
    correct: 0,
    category: 'Vocabulaire',
  },
  {
    question: 'I ___ this movie yesterday.',
    options: ['have seen', 'saw', 'have saw'],
    correct: 1,
    category: 'Passé simple',
  },
  {
    question: "I'm interested ___ learning English.",
    options: ['on', 'in', 'at'],
    correct: 1,
    category: 'Prépositions',
  },
  {
    question: '"I\'ve lived here for 5 years" means:',
    options: [
      'I live here now and started 5 years ago',
      'I lived here but moved away',
      'I will live here in the future',
    ],
    correct: 0,
    category: 'Present perfect',
  },
  {
    question: 'If I ___ more time, I would travel more.',
    options: ['have', 'had', 'will have'],
    correct: 1,
    category: 'Conditionnel',
  },
  {
    question: 'Choose the best sentence for a formal email:',
    options: [
      "Hey, what's up?",
      'I would like to know more about your services.',
      'Yo, tell me more.',
    ],
    correct: 1,
    category: 'Anglais formel',
  },
  {
    question: 'Which sentence is correct?',
    options: ['I did a mistake', 'I made a mistake', 'I make a mistake yesterday'],
    correct: 1,
    category: 'Erreurs courantes',
  },
  {
    question: 'She ___ here since 2020.',
    options: ['works', 'worked', 'has worked'],
    correct: 2,
    category: 'Grammaire avancée',
  },
  {
    question: 'Which sounds most natural?',
    options: [
      'I look forward to meet you.',
      'I look forward to meeting you.',
      'I look forward meet you.',
    ],
    correct: 1,
    category: 'Anglais naturel',
  },
];
