
export interface Option {
  value: string;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
  category: "personality" | "confidence" | "irritability" | "anxiety" | "temperament";
}

export interface MbtiResult {
  type: string;
  title: string;
  description: string;
}

export interface TestResults {
  personality: number;
  temperament: number;
  confidence: number;
  irritability: number;
  anxiety: number;
  mbti?: MbtiResult;
  date?: Date;
  id?: string;
}

export type Answers = Record<number, string>;

export interface Emotion {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  recommendations: string[];
  copingStrategies?: string[];
}

export interface EmotionEvent {
  date: Date;
  emotionId: string;
  note?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  testResults?: TestResults[];
  emotions?: EmotionEvent[];
}
