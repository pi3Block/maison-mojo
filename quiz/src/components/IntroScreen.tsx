import { motion } from 'motion/react';
import { Sparkles, Home, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IntroScreenProps {
  onStart: () => void;
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Background decorations - static for better mobile performance */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-yellow-200/30 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
          className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-2xl shadow-orange-500/30"
        >
          <Home className="w-12 h-12 text-white" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-amber-900 to-orange-800 bg-clip-text text-transparent"
        >
          Quelle ambiance déco
          <br />
          <span className="text-5xl md:text-7xl">vous correspond ?</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-600 mb-12 max-w-lg mx-auto"
        >
          Découvrez votre style d'intérieur idéal en répondant à 6 questions sur votre personnalité et vos préférences.
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { icon: "🎨", text: "11 ambiances uniques" },
            { icon: "⏱️", text: "2 minutes" },
            { icon: "✨", text: "Résultat personnalisé" },
          ].map((feature, index) => (
            <motion.div
              key={feature.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/90 rounded-full shadow-md border border-white/50"
            >
              <span className="text-xl">{feature.icon}</span>
              <span className="text-sm font-medium text-gray-700">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <Button
            onClick={onStart}
            size="xl"
            className="group bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-semibold shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Commencer le quiz
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
