
import { Question } from "@/types/test";

// Разбивает большой массив вопросов на чанки для более эффективной загрузки
export function createChunkedQuestions(questions: Question[], chunkSize: number = 20): Question[][] {
  const chunks: Question[][] = [];
  
  for (let i = 0; i < questions.length; i += chunkSize) {
    chunks.push(questions.slice(i, i + chunkSize));
  }
  
  return chunks;
}
