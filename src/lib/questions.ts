export interface Question {
  id: number;
  text: string;
  category: string;
}

export const anxietyQuestions: Question[] = [
  { id: 1, text: "Feeling nervous, anxious, or on edge", category: "anxiety" },
  { id: 2, text: "Not being able to stop or control worrying", category: "anxiety" },
  { id: 3, text: "Worrying too much about different things", category: "anxiety" },
  { id: 4, text: "Trouble relaxing", category: "anxiety" },
  { id: 5, text: "Being so restless that it's hard to sit still", category: "anxiety" },
  { id: 6, text: "Becoming easily annoyed or irritable", category: "anxiety" },
  { id: 7, text: "Feeling afraid as if something awful might happen", category: "anxiety" },
];

export const depressionQuestions: Question[] = [
  { id: 8, text: "Little interest or pleasure in doing things", category: "depression" },
  { id: 9, text: "Feeling down, depressed, or hopeless", category: "depression" },
  { id: 10, text: "Trouble falling or staying asleep, or sleeping too much", category: "depression" },
  { id: 11, text: "Feeling tired or having little energy", category: "depression" },
  { id: 12, text: "Poor appetite or overeating", category: "depression" },
  { id: 13, text: "Feeling bad about yourself — or that you are a failure", category: "depression" },
  { id: 14, text: "Trouble concentrating on things", category: "depression" },
  { id: 15, text: "Moving or speaking so slowly that others could have noticed, or being fidgety", category: "depression" },
  { id: 16, text: "Thoughts that you would be better off dead or of hurting yourself", category: "depression" },
];

export const relationshipQuestions: Question[] = [
  { id: 1, text: "I feel heard and understood by my partner/close ones", category: "communication" },
  { id: 2, text: "We can discuss disagreements calmly without escalation", category: "communication" },
  { id: 3, text: "I feel comfortable expressing my true feelings", category: "communication" },
  { id: 4, text: "I trust my partner/close ones to be honest with me", category: "trust" },
  { id: 5, text: "I feel emotionally safe in this relationship", category: "trust" },
  { id: 6, text: "My boundaries are respected", category: "trust" },
  { id: 7, text: "Arguments happen infrequently and resolve constructively", category: "conflict" },
  { id: 8, text: "Neither of us uses insults or put-downs during disagreements", category: "conflict" },
  { id: 9, text: "I do not feel controlled or manipulated", category: "conflict" },
  { id: 10, text: "Overall, this relationship makes me feel good about myself", category: "overall" },
];

export const answerOptions = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" },
];

export const relationshipAnswerOptions = [
  { value: 3, label: "Strongly agree" },
  { value: 2, label: "Agree" },
  { value: 1, label: "Disagree" },
  { value: 0, label: "Strongly disagree" },
];

export type ScoreLevel = "low" | "moderate" | "high";

export function getAnxietyLevel(score: number): ScoreLevel {
  if (score <= 4) return "low";
  if (score <= 14) return "moderate";
  return "high";
}

export function getDepressionLevel(score: number): ScoreLevel {
  if (score <= 4) return "low";
  if (score <= 14) return "moderate";
  return "high";
}

export type RelationshipLevel = "healthy" | "needs-attention" | "potentially-toxic";

export function getRelationshipLevel(score: number): RelationshipLevel {
  if (score >= 22) return "healthy";
  if (score >= 12) return "needs-attention";
  return "potentially-toxic";
}

export interface Suggestion {
  title: string;
  description: string;
  icon: string;
  category: string;
}

export const suggestions: Record<string, Suggestion[]> = {
  low: [
    { title: "Deep Breathing", description: "Practice 4-7-8 breathing: Inhale 4s, hold 7s, exhale 8s. Do this 3 times daily.", icon: "🌬️", category: "Breathing" },
    { title: "Nature Walk", description: "Spend 20 minutes outdoors in nature. Notice the sounds, colors, and textures around you.", icon: "🌿", category: "Physical Activity" },
    { title: "Gratitude Journal", description: "Write down 3 things you're grateful for each evening before bed.", icon: "📝", category: "Journaling" },
  ],
  moderate: [
    { title: "Guided Meditation", description: "Start with 10-minute guided meditations. Focus on body scan or loving-kindness meditation.", icon: "🧘", category: "Meditation" },
    { title: "Sleep Hygiene", description: "Set a consistent bedtime. Avoid screens 1 hour before sleep. Keep your room cool and dark.", icon: "😴", category: "Sleep" },
    { title: "Journaling Practice", description: "Write for 15 minutes daily about your thoughts and feelings without judgment.", icon: "✍️", category: "Journaling" },
    { title: "Exercise Routine", description: "Aim for 30 minutes of moderate exercise 5 days a week. Walking, yoga, or swimming are great options.", icon: "🏃", category: "Physical Activity" },
    { title: "Social Connection", description: "Reach out to a friend or family member. Even a short conversation can boost your mood.", icon: "🤝", category: "Social" },
  ],
  high: [
    { title: "Seek Professional Help", description: "Consider speaking with a licensed therapist or counselor. Your well-being matters.", icon: "🩺", category: "Professional" },
    { title: "Crisis Resources", description: "If you're in immediate distress, reach out to a mental health helpline in your area.", icon: "📞", category: "Emergency" },
    { title: "Grounding Technique", description: "Try the 5-4-3-2-1 method: Name 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste.", icon: "🌍", category: "Coping" },
    { title: "Daily Structure", description: "Create a simple daily routine with meals, rest, gentle movement, and one enjoyable activity.", icon: "📋", category: "Lifestyle" },
    { title: "Breathing Exercise", description: "Box breathing: Inhale 4s, hold 4s, exhale 4s, hold 4s. Repeat for 5 minutes when anxious.", icon: "🫁", category: "Breathing" },
    { title: "Progressive Relaxation", description: "Tense and release each muscle group from toes to head. Hold tension 5s, release 10s.", icon: "💆", category: "Meditation" },
  ],
};

export const relationshipAdvice: Record<string, { tips: string[]; redFlags: string[] }> = {
  healthy: {
    tips: [
      "Keep nurturing open communication",
      "Continue to show appreciation for each other",
      "Maintain healthy boundaries while staying connected",
      "Schedule regular quality time together",
    ],
    redFlags: [],
  },
  "needs-attention": {
    tips: [
      "Practice active listening without interrupting",
      "Use 'I feel' statements instead of 'You always' accusations",
      "Set aside dedicated time to discuss concerns calmly",
      "Consider couples counseling or workshops",
      "Work on rebuilding trust through consistent actions",
    ],
    redFlags: [
      "Frequent dismissal of your feelings",
      "Difficulty resolving conflicts without escalation",
      "Feeling like you're walking on eggshells",
    ],
  },
  "potentially-toxic": {
    tips: [
      "Prioritize your own safety and well-being",
      "Seek support from trusted friends, family, or professionals",
      "Consider speaking with a counselor individually",
      "Establish and enforce clear boundaries",
      "Remember: you deserve to feel safe and respected",
    ],
    redFlags: [
      "Controlling or manipulative behavior",
      "Frequent insults, put-downs, or gaslighting",
      "Feeling afraid to express your true feelings",
      "Isolation from friends and family",
      "Any form of physical, emotional, or financial abuse",
    ],
  },
};

export interface MoodEntry {
  date: string;
  mood: string;
  emoji: string;
  note?: string;
}

export const moodOptions = [
  { mood: "Happy", emoji: "😊", color: "wellness-yellow" },
  { mood: "Calm", emoji: "😌", color: "wellness-green" },
  { mood: "Neutral", emoji: "😐", color: "wellness-blue" },
  { mood: "Anxious", emoji: "😰", color: "wellness-peach" },
  { mood: "Sad", emoji: "😢", color: "wellness-lavender" },
  { mood: "Stressed", emoji: "😤", color: "wellness-rose" },
];
