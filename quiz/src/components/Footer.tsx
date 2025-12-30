import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
      className="relative mt-12 pb-8"
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent mb-8"
        />

        {/* Main content */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.4, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 border border-amber-200/50 shadow-lg"
          >
            <motion.span
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
            </motion.span>

            <span className="text-gray-600 text-sm md:text-base">
              Ce quiz vous est proposé par{' '}
              <motion.span
                className="font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                maisonmojo.fr
              </motion.span>
              {' '}en partenariat avec{' '}
              <motion.a
                href="https://augmenter.pro"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent hover:from-rose-600 hover:to-pink-700 transition-all duration-300 relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                augmenter.pro
                {/* Underline animation */}
                <motion.span
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-600 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </span>

            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            </motion.span>
          </motion.div>

          {/* Floating particles */}
          <div className="relative h-8 mt-4 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  backgroundColor: ['#f59e0b', '#f97316', '#ef4444', '#ec4899', '#fbbf24'][i],
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
