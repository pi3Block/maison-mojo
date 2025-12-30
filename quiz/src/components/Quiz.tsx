import { useEffect, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { useQuiz } from '@/hooks/useQuiz';
import { IntroScreen } from './IntroScreen';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';
import { ResultCard } from './ResultCard';

export function Quiz() {
  const {
    currentIndex,
    currentQuestion,
    quizState,
    fullResults,
    progress,
    totalQuestions,
    currentAnswer,
    canGoNext,
    canGoPrevious,
    isLastQuestion,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    restart,
    startQuiz,
  } = useQuiz();

  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to top when question changes
  useEffect(() => {
    if (quizState === 'playing') {
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentIndex, quizState]);

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {quizState === 'intro' && (
          <IntroScreen key="intro" onStart={startQuiz} />
        )}

        {quizState === 'playing' && currentQuestion && (
          <div
            key="playing"
            ref={containerRef}
            className="min-h-screen flex flex-col items-center justify-start md:justify-center py-6 px-4 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50"
          >
            {/* Background decorations - simplified for mobile */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-rose-200/20 to-pink-200/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-3xl">
              <ProgressBar
                current={currentIndex + 1}
                total={totalQuestions}
                progress={progress}
              />

              <AnimatePresence mode="wait">
                <QuestionCard
                  key={currentQuestion.id}
                  question={currentQuestion}
                  currentAnswer={currentAnswer}
                  onSelectAnswer={selectAnswer}
                  onNext={nextQuestion}
                  onPrevious={previousQuestion}
                  canGoNext={canGoNext}
                  canGoPrevious={canGoPrevious}
                  isLastQuestion={isLastQuestion}
                />
              </AnimatePresence>
            </div>
          </div>
        )}

        {quizState === 'result' && fullResults && (
          <ResultCard
            key="result"
            result={fullResults.primary}
            secondaryResults={fullResults.secondary}
            onRestart={restart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
