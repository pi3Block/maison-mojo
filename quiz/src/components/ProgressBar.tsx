import { motion } from 'motion/react';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  current: number;
  total: number;
  progress: number;
}

export function ProgressBar({ current, total, progress }: ProgressBarProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-3">
        <motion.span
          key={current}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium text-gray-600"
        >
          Question {current} sur {total}
        </motion.span>
        <motion.span
          key={`progress-${current}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-sm font-bold text-amber-600"
        >
          {Math.round(progress)}%
        </motion.span>
      </div>

      <div className="relative">
        <Progress
          value={progress}
          className="h-3 bg-gray-100"
          indicatorClassName="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500"
        />

        {/* Glow effect */}
        <motion.div
          className="absolute top-0 h-3 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 blur-sm opacity-50"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between mt-2">
        {Array.from({ length: total }).map((_, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{
              scale: index + 1 === current ? 1.3 : 1,
              backgroundColor: index + 1 <= current ? "#f59e0b" : "#e5e7eb",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-2 h-2 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}
