import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ToastState {
  show: boolean;
  message: string;
  type?: 'success' | 'error' | 'info';
}

let externalSetter: ((s: ToastState) => void) | null = null;

export function toast(message: string, type: ToastState['type'] = 'success') {
  externalSetter?.({ show: true, message, type });
  setTimeout(() => externalSetter?.({ show: false, message: '', type }), 2600);
}

export function ToastHost() {
  return <ToastInner />;
}

function ToastInner() {
  const [state, setState] = useStateInternal();
  externalSetter = setState;
  if (!state.show) return null;
  const color =
    state.type === 'error'
      ? 'bg-rose-600'
      : state.type === 'info'
      ? 'bg-brand-600'
      : 'bg-emerald-600';
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: 30 }}
      className={`fixed bottom-6 left-1/2 z-[60] rounded-xl px-5 py-3 text-sm font-medium text-white shadow-glow ${color}`}
    >
      {state.message}
    </motion.div>
  );
}

import { useState } from 'react';
function useStateInternal() {
  return useState<ToastState>({ show: false, message: '' });
}

export function ConfirmDialog({ open, onClose, onConfirm, message }: { open: boolean; onClose: () => void; onConfirm: () => void; message: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative card p-6 max-w-sm w-full text-center"
      >
        <p className="text-ink-700 dark:text-ink-200 mb-5">{message}</p>
        <div className="flex justify-center gap-3">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary !bg-rose-600 hover:!bg-rose-700" onClick={() => { onConfirm(); onClose(); }}>Delete</button>
        </div>
      </motion.div>
    </div>
  );
}
