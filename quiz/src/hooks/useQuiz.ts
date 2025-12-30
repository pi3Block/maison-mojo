import { useState, useCallback, useMemo } from 'react';
import type { StyleLetter, QuizState, StyleResult } from '@/types/quiz';
import { questions } from '@/data/questions';
import { styleResults } from '@/data/results';
import { calculateFullResults, type QuizResults } from '@/utils/calculateResult';

export interface FullResults {
  primary: StyleResult;
  secondary: StyleResult[];
  distribution: Record<StyleLetter, number>;
}

export function useQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<StyleLetter[]>([]);
  const [quizState, setQuizState] = useState<QuizState>('intro');

  const totalQuestions = questions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const currentQuestion = useMemo(() => {
    return questions[currentIndex] || null;
  }, [currentIndex]);

  // Résultat principal (pour compatibilité)
  const result: StyleResult | null = useMemo(() => {
    if (quizState !== 'result' || answers.length === 0) return null;
    const quizResults = calculateFullResults(answers);
    return styleResults[quizResults.primary];
  }, [quizState, answers]);

  // Résultats complets avec styles secondaires
  const fullResults: FullResults | null = useMemo(() => {
    if (quizState !== 'result' || answers.length === 0) return null;

    const quizResults: QuizResults = calculateFullResults(answers);

    return {
      primary: styleResults[quizResults.primary],
      secondary: quizResults.secondary.map(letter => styleResults[letter]),
      distribution: quizResults.distribution,
    };
  }, [quizState, answers]);

  const startQuiz = useCallback(() => {
    setQuizState('playing');
    setCurrentIndex(0);
    setAnswers([]);
  }, []);

  const selectAnswer = useCallback((letter: StyleLetter) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentIndex] = letter;
      return newAnswers;
    });
  }, [currentIndex]);

  const nextQuestion = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Quiz terminé
      setQuizState('result');
    }
  }, [currentIndex, totalQuestions]);

  const previousQuestion = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const restart = useCallback(() => {
    setQuizState('intro');
    setCurrentIndex(0);
    setAnswers([]);
  }, []);

  const currentAnswer = answers[currentIndex] || null;
  const canGoNext = currentAnswer !== null;
  const canGoPrevious = currentIndex > 0;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  return {
    // State
    currentIndex,
    currentQuestion,
    answers,
    quizState,
    result,
    fullResults,
    progress,
    totalQuestions,
    currentAnswer,

    // Computed
    canGoNext,
    canGoPrevious,
    isLastQuestion,

    // Actions
    selectAnswer,
    nextQuestion,
    previousQuestion,
    restart,
    startQuiz,
  };
}
