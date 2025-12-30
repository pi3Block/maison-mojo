import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OptionButton } from './OptionButton';
import type { Question, StyleLetter } from '@/types/quiz';

interface QuestionCardProps {
  question: Question;
  currentAnswer: StyleLetter | null;
  onSelectAnswer: (value: StyleLetter) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastQuestion: boolean;
}

export function QuestionCard({
  question,
  currentAnswer,
  onSelectAnswer,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isLastQuestion,
}: QuestionCardProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100, scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="overflow-hidden border-0 shadow-2xl bg-white/90 backdrop-blur-md">
        <CardHeader className="pb-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CardTitle className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed">
              {question.text}
            </CardTitle>
          </motion.div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Options grid - 2 columns on larger screens */}
          <div className="grid gap-3 md:grid-cols-2">
            {question.options.map((option, index) => (
              <OptionButton
                key={option.value}
                label={option.label}
                value={option.value}
                isSelected={currentAnswer === option.value}
                onSelect={onSelectAnswer}
                index={index}
              />
            ))}
          </div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100"
          >
            <Button
              variant="ghost"
              onClick={onPrevious}
              disabled={!canGoPrevious}
              className="text-gray-600 hover:text-gray-900 disabled:opacity-0"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>

            <Button
              onClick={onNext}
              disabled={!canGoNext}
              size="lg"
              className={`
                relative overflow-hidden font-semibold
                ${isLastQuestion
                  ? "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600"
                  : "bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black"
                }
                text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-300
              `}
            >
              {isLastQuestion ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Découvrir mon style
                </>
              ) : (
                <>
                  Suivant
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}

              {/* Shimmer effect */}
              {canGoNext && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />
              )}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
