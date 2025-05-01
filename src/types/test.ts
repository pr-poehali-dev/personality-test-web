
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

export type Answers = Record<number, string>;
