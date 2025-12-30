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
  const [answers, setAnswers] = useState<StyleLetter[][]>([]);  // Tableau de tableaux
  const [quizState, setQuizState] = useState<QuizState>('intro');

  const totalQuestions = questions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const currentQuestion = useMemo(() => {
    return questions[currentIndex] || null;
  }, [currentIndex]);

  // Flatten les réponses pour le calcul (transformer StyleLetter[][] en StyleLetter[])
  const flattenedAnswers = useMemo(() => {
    return answers.flat();
  }, [answers]);

  // Résultat principal (pour compatibilité)
  const result: StyleResult | null = useMemo(() => {
    if (quizState !== 'result' || flattenedAnswers.length === 0) return null;
    const quizResults = calculateFullResults(flattenedAnswers);
    return styleResults[quizResults.primary];
  }, [quizState, flattenedAnswers]);

  // Résultats complets avec styles secondaires
  const fullResults: FullResults | null = useMemo(() => {
    if (quizState !== 'result' || flattenedAnswers.length === 0) return null;

    const quizResults: QuizResults = calculateFullResults(flattenedAnswers);

    return {
      primary: styleResults[quizResults.primary],
      secondary: quizResults.secondary.map(letter => styleResults[letter]),
      distribution: quizResults.distribution,
    };
  }, [quizState, flattenedAnswers]);

  const startQuiz = useCallback(() => {
    setQuizState('playing');
    setCurrentIndex(0);
    setAnswers([]);
  }, []);

  // Toggle une réponse (ajouter ou retirer)
  const selectAnswer = useCallback((letter: StyleLetter) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      const currentSelections = newAnswers[currentIndex] || [];

      if (currentSelections.includes(letter)) {
        // Retirer la sélection
        newAnswers[currentIndex] = currentSelections.filter(l => l !== letter);
      } else {
        // Ajouter la sélection
        newAnswers[currentIndex] = [...currentSelections, letter];
      }

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

  const currentAnswers = answers[currentIndex] || [];
  const canGoNext = currentAnswers.length > 0;  // Au moins une sélection
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
    currentAnswers,  // Renommé: tableau de sélections pour la question actuelle

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
