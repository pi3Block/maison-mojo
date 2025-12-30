import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { StyleLetter } from '@/types/quiz';

interface OptionButtonProps {
  label: string;
  value: StyleLetter;
  isSelected: boolean;
  onSelect: (value: StyleLetter) => void;
  index: number;
}

export function OptionButton({
  label,
  value,
  isSelected,
  onSelect,
  index,
}: OptionButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: index * 0.05,
        duration: 0.3,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.02, x: 8 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(value)}
      className={cn(
        "group relative w-full text-left p-4 rounded-xl border-2 transition-all duration-300",
        "bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg",
        isSelected
          ? "border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 shadow-amber-500/20"
          : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/50"
      )}
    >
      {/* Checkbox indicator + Label */}
      <div className="flex items-center gap-3">
        <motion.div
          initial={false}
          animate={{
            scale: isSelected ? 1.1 : 1,
            backgroundColor: isSelected ? "#f59e0b" : "#f3f4f6",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={cn(
            "flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-colors",
            isSelected ? "text-white" : "text-gray-400 group-hover:text-amber-500"
          )}
        >
          {isSelected && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Check className="w-4 h-4" />
            </motion.div>
          )}
        </motion.div>

        {/* Label */}
        <span
          className={cn(
            "flex-1 text-base font-medium leading-snug transition-colors",
            isSelected ? "text-amber-900" : "text-gray-700 group-hover:text-gray-900"
          )}
        >
          {label}
        </span>
      </div>

      {/* Selection indicator line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isSelected ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-b-xl origin-left"
      />

      {/* Hover glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.5 }}
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-100/50 to-orange-100/50 -z-10"
      />
    </motion.button>
  );
}
