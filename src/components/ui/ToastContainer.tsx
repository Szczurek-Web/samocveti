'use client';

import { useToastStore } from '@/store/toastStore';

export default function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-24 right-6 z-[100] flex flex-col gap-2"
      style={{ maxWidth: '360px' }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-medium backdrop-blur-md"
          style={{
            background:
              toast.type === 'success'
                ? 'rgba(45,107,79,0.9)'
                : toast.type === 'error'
                  ? 'rgba(139,34,82,0.9)'
                  : 'rgba(212,168,83,0.9)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            animation: 'slideUp 0.3s ease-out',
          }}
        >
          <span className="text-lg flex-shrink-0">
            {toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'}
          </span>
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-lg opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
