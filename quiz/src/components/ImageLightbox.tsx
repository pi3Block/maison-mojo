import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  downloadName: string;
}

export function ImageLightbox({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  downloadName,
}: ImageLightboxProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${downloadName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      // Fallback: open image in new tab
      window.open(imageSrc, '_blank');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.1 }}
            onClick={onClose}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </motion.button>

          {/* Download button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              onClick={handleDownload}
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 shadow-2xl font-semibold"
            >
              <Download className="w-5 h-5 mr-2" />
              Télécharger l'image
            </Button>
          </motion.div>

          {/* Image container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative max-w-5xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface ImageWithLightboxProps {
  src: string;
  alt: string;
  downloadName: string;
  className?: string;
  onLoad?: () => void;
}

export function ImageWithLightbox({
  src,
  alt,
  downloadName,
  className = '',
  onLoad,
}: ImageWithLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative group cursor-pointer" onClick={() => setIsOpen(true)}>
        <img
          src={src}
          alt={alt}
          onLoad={onLoad}
          className={className}
        />
        {/* Zoom overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-4 rounded-full bg-white/90 shadow-lg">
              <ZoomIn className="w-8 h-8 text-gray-800" />
            </div>
          </div>
        </div>
      </div>

      <ImageLightbox
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        imageSrc={src}
        imageAlt={alt}
        downloadName={downloadName}
      />
    </>
  );
}
