// src/app/models/question.model.ts

export interface Question {
  id: number;
  text: string;
  type: 'radio' | 'checkbox' | 'select' | 'text';
  options: string[];
  children?: Question[];
}

export interface Response {
  questionId: number;
  selectedOption: string | string[];
}
