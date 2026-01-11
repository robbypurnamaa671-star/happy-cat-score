import { Question } from '@/types/catCare';

export const careQuestions: Question[] = [
  {
    id: 'eating',
    title: 'How many times did your cat eat today?',
    icon: '🍽️',
    options: [
      { label: '0 times', value: '0', score: 0, isAlert: true, alertMessage: 'Your cat did not eat at all today' },
      { label: '1 time', value: '1', score: 6 },
      { label: '2–3 times (normal)', value: '2-3', score: 10 },
      { label: 'More than 3 times', value: '3+', score: 7 },
    ],
  },
  {
    id: 'drinking',
    title: 'How much water did your cat drink?',
    icon: '💧',
    options: [
      { label: 'Normal', value: 'normal', score: 10 },
      { label: 'Less than usual', value: 'less', score: 5 },
      { label: 'More than usual', value: 'more', score: 6 },
      { label: 'Not sure', value: 'unsure', score: 7 },
    ],
  },
  {
    id: 'urination',
    title: 'How often did your cat urinate?',
    icon: '🚽',
    options: [
      { label: '1–3 times (normal)', value: 'normal', score: 10 },
      { label: 'More than usual', value: 'more', score: 6 },
      { label: 'Straining / very little', value: 'straining', score: 0, isAlert: true, alertMessage: 'Straining or difficulty urinating detected' },
      { label: 'Not sure', value: 'unsure', score: 7 },
    ],
  },
  {
    id: 'defecation',
    title: 'How was your cat\'s poop today?',
    icon: '💩',
    options: [
      { label: 'Normal', value: 'normal', score: 10 },
      { label: 'Soft / diarrhea', value: 'soft', score: 4 },
      { label: 'Hard / constipated', value: 'hard', score: 5 },
      { label: 'Didn\'t poop today', value: 'none', score: 6 },
    ],
  },
  {
    id: 'activity',
    title: 'How active was your cat today?',
    icon: '🐱',
    options: [
      { label: 'Active & playful', value: 'active', score: 10 },
      { label: 'Normal', value: 'normal', score: 10 },
      { label: 'Less active', value: 'less', score: 5 },
      { label: 'Very weak / hiding', value: 'weak', score: 0, isAlert: true, alertMessage: 'Your cat appears very weak or is hiding' },
    ],
  },
  {
    id: 'mood',
    title: 'How was your cat\'s mood today?',
    icon: '😺',
    options: [
      { label: 'Normal', value: 'normal', score: 10 },
      { label: 'More aggressive', value: 'aggressive', score: 5 },
      { label: 'More quiet than usual', value: 'quiet', score: 6 },
      { label: 'Hiding all day', value: 'hiding', score: 0, isAlert: true, alertMessage: 'Your cat has been hiding all day' },
    ],
  },
  {
    id: 'vomiting',
    title: 'Did your cat vomit today?',
    icon: '🤢',
    options: [
      { label: 'No', value: 'no', score: 10 },
      { label: 'Hairball only', value: 'hairball', score: 8 },
      { label: 'Once', value: 'once', score: 4 },
      { label: 'More than once', value: 'multiple', score: 2 },
    ],
  },
  {
    id: 'grooming',
    title: 'How does your cat\'s coat look?',
    icon: '✨',
    options: [
      { label: 'Clean & shiny', value: 'clean', score: 10 },
      { label: 'Slightly messy', value: 'messy', score: 7 },
      { label: 'Greasy / unkempt', value: 'greasy', score: 4 },
      { label: 'Not grooming', value: 'none', score: 2 },
    ],
  },
  {
    id: 'sleep',
    title: 'How was your cat\'s sleep pattern?',
    icon: '😴',
    options: [
      { label: 'Same as usual', value: 'normal', score: 10 },
      { label: 'Slightly more', value: 'more', score: 8 },
      { label: 'Much more', value: 'much-more', score: 5 },
      { label: 'Much less / restless', value: 'less', score: 4 },
    ],
  },
  {
    id: 'breathing',
    title: 'How was your cat\'s breathing?',
    icon: '🌬️',
    options: [
      { label: 'Normal', value: 'normal', score: 10 },
      { label: 'Sneezing / mild discharge', value: 'sneezing', score: 6 },
      { label: 'Mouth breathing', value: 'mouth', score: 0, isAlert: true, alertMessage: 'Mouth breathing detected - this needs attention' },
      { label: 'Rapid or labored', value: 'labored', score: 0, isAlert: true, alertMessage: 'Rapid or labored breathing detected' },
    ],
  },
];

export const careTips = [
  "Lower activity can sometimes be caused by stress or routine changes. Keep monitoring tomorrow.",
  "Cats love routine! Try to keep feeding times consistent each day.",
  "Make sure your cat always has access to fresh, clean water.",
  "Regular playtime helps keep your cat mentally and physically healthy.",
  "Brushing your cat regularly can help reduce hairballs.",
  "A quiet, cozy spot can help anxious cats feel safe.",
  "Changes in eating habits are worth monitoring over a few days.",
  "Cats typically need 12-16 hours of sleep per day - that's normal!",
  "Environmental changes can affect your cat's mood and behavior.",
  "Regular vet check-ups help catch issues early.",
];
