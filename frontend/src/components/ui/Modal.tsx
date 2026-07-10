import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  if (!open) return null;
  const w = size === 'sm' ? 'max-w-md' : size === 'lg' ? 'max-w-3xl' : 'max-w-xl';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />
      <motion.div
        className={`relative w-full ${w} card p-6 max-h-[90vh] overflow-y-auto`}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        {title && (
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-ink-900 dark:text-white">{title}</h3>
            <button onClick={onClose} className="btn-ghost rounded-lg px-2 py-1 text-lg">✕</button>
          </div>
        )}
        {children}
      </motion.div>
    </div>
  );
}
