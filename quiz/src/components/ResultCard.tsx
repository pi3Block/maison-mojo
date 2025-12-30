import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RotateCcw, Share2, Heart, ZoomIn, Download, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImageLightbox } from './ImageLightbox';
import { Footer } from './Footer';
import type { StyleResult } from '@/types/quiz';

interface ResultCardProps {
  result: StyleResult;
  secondaryResults?: StyleResult[];
  onRestart: () => void;
}

// Composant pour les cartes secondaires
function SecondaryStyleCard({
  style,
  index,
  onOpenLightbox,
}: {
  style: StyleResult;
  index: number;
  onOpenLightbox: (style: StyleResult) => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 + index * 0.2, type: "spring", stiffness: 200 }}
      className="group cursor-pointer"
      onClick={() => onOpenLightbox(style)}
    >
      <Card className="overflow-hidden border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
          )}
          <img
            src={style.image}
            alt={style.title}
            onLoad={() => setImageLoaded(true)}
            className={`
              w-full h-full object-cover transition-all duration-500
              ${imageLoaded ? "opacity-100" : "opacity-0"}
              group-hover:scale-110
            `}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Zoom icon on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-3 rounded-full bg-white/90 shadow-lg">
              <ZoomIn className="w-5 h-5 text-gray-800" />
            </div>
          </div>

          {/* Badge */}
          <div
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: style.color }}
          >
            {style.letter}
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h4 className="text-white font-bold text-lg">{style.title}</h4>
            <p className="text-white/80 text-sm">{style.subtitle}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function ResultCard({ result, secondaryResults = [], onRestart }: ResultCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<StyleResult>(result);

  useEffect(() => {
    // Trigger confetti celebration
    const duration = 4000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Confetti from both sides
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#f59e0b', '#f97316', '#ef4444', '#ec4899', '#fbbf24'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#f59e0b', '#f97316', '#ef4444', '#ec4899', '#fbbf24'],
      });
    }, 250);

    // Show content after a delay
    const timer = setTimeout(() => setShowContent(true), 500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Mon style déco : ${result.title}`,
          text: `J'ai découvert mon style déco idéal : ${result.title} ! Découvre le tien aussi.`,
          url: window.location.href,
        });
      } catch {
        // User cancelled or error
      }
    }
  };

  const handleDownload = async (style: StyleResult) => {
    try {
      const response = await fetch(style.image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${style.title.replace(/\s+/g, '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(style.image, '_blank');
    }
  };

  const openLightbox = (style: StyleResult) => {
    setLightboxImage(style);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 overflow-auto">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 w-64 h-64 rounded-full blur-3xl"
          style={{ backgroundColor: `${result.color}30` }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: `${result.color}20` }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Image Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc={lightboxImage.image}
        imageAlt={lightboxImage.title}
        downloadName={lightboxImage.title.replace(/\s+/g, '-')}
      />

      <AnimatePresence>
        {showContent && (
          <div className="relative z-10 max-w-6xl mx-auto space-y-8">
            {/* Main Result Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className="relative"
            >
              <Card className="overflow-hidden border-0 shadow-2xl bg-white/95 backdrop-blur-md">
                {/* Header with gradient */}
                <div
                  className={`relative h-16 bg-gradient-to-r ${result.gradient}`}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>

                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Image Section - Clickable for lightbox */}
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="lg:w-1/2 relative overflow-hidden group cursor-pointer"
                      onClick={() => openLightbox(result)}
                    >
                      <div className="aspect-[4/3] lg:aspect-auto lg:h-full relative min-h-[300px]">
                        {!imageLoaded && (
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
                        )}
                        <img
                          src={result.image}
                          alt={result.title}
                          onLoad={() => setImageLoaded(true)}
                          className={`
                            w-full h-full object-cover transition-all duration-500
                            ${imageLoaded ? "opacity-100" : "opacity-0"}
                            group-hover:scale-105
                          `}
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                        {/* Zoom overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="p-4 rounded-full bg-white/90 shadow-lg">
                              <ZoomIn className="w-8 h-8 text-gray-800" />
                            </div>
                          </div>
                        </div>

                        {/* Badge */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.6, type: "spring" }}
                          className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg"
                        >
                          <span className="flex items-center gap-2 text-sm font-semibold">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            Votre style principal
                          </span>
                        </motion.div>

                        {/* Click hint */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                          className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium"
                        >
                          Cliquer pour agrandir
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="lg:w-1/2 p-8 flex flex-col"
                    >
                      {/* Title */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <span
                          className="text-sm font-semibold uppercase tracking-wider"
                          style={{ color: result.color }}
                        >
                          {result.subtitle}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-900">
                          {result.title}
                        </h2>
                      </motion.div>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-gray-600 leading-relaxed mb-8 flex-1"
                      >
                        {result.description}
                      </motion.p>

                      {/* Action Buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="space-y-3"
                      >
                        {/* Image actions */}
                        <div className="flex gap-3">
                          <Button
                            onClick={() => openLightbox(result)}
                            variant="outline"
                            className="flex-1 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                          >
                            <ZoomIn className="w-4 h-4 mr-2" />
                            Agrandir
                          </Button>
                          <Button
                            onClick={() => handleDownload(result)}
                            variant="outline"
                            className="flex-1 border-gray-200 hover:border-green-300 hover:bg-green-50"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Télécharger
                          </Button>
                        </div>

                        {/* Share buttons */}
                        <div className="flex gap-3">
                          <Button
                            onClick={handleShare}
                            variant="outline"
                            className="flex-1 border-gray-200 hover:border-amber-300 hover:bg-amber-50"
                          >
                            <Share2 className="w-4 h-4 mr-2" />
                            Partager
                          </Button>
                          <Button
                            variant="outline"
                            className="border-gray-200 hover:border-rose-300 hover:bg-rose-50"
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Restart button */}
                        <Button
                          onClick={onRestart}
                          size="lg"
                          className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white shadow-lg"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Refaire le quiz
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>

              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="absolute -top-6 -right-6 w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl"
                style={{ backgroundColor: result.color }}
              >
                <span className="text-3xl font-bold text-white">{result.letter}</span>
              </motion.div>
            </motion.div>

            {/* Secondary Results Section */}
            {secondaryResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="mt-12"
              >
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md mb-4"
                  >
                    <Star className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-semibold text-gray-700">
                      Vos styles secondaires
                    </span>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.15 }}
                    className="text-gray-500 text-sm"
                  >
                    Ces ambiances correspondent aussi à certains aspects de votre personnalité
                  </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  {secondaryResults.map((style, index) => (
                    <SecondaryStyleCard
                      key={style.letter}
                      style={style}
                      index={index}
                      onOpenLightbox={openLightbox}
                    />
                  ))}
                </div>

                {/* Download all button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 }}
                  className="text-center mt-6"
                >
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Download all images
                      handleDownload(result);
                      secondaryResults.forEach((style, i) => {
                        setTimeout(() => handleDownload(style), (i + 1) * 500);
                      });
                    }}
                    className="border-gray-200 hover:border-amber-300 hover:bg-amber-50"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger toutes les planches
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {/* Footer */}
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
