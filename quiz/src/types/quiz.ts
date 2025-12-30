export type StyleLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K';

export interface Option {
  label: string;
  value: StyleLetter;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface StyleResult {
  letter: StyleLetter;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
  gradient: string;
}

export type QuizState = 'intro' | 'playing' | 'result';

export interface QuizContextType {
  currentIndex: number;
  answers: StyleLetter[];
  quizState: QuizState;
  result: StyleResult | null;
  selectAnswer: (letter: StyleLetter) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  restart: () => void;
  startQuiz: () => void;
  progress: number;
  totalQuestions: number;
}
