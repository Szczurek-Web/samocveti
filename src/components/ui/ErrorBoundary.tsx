'use client';

import { Component, type ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className="min-h-screen flex flex-col items-center justify-center"
          style={{ background: 'var(--color-bg)' }}
        >
          <div
            className="max-w-md text-center p-10 rounded-2xl"
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
            }}
          >
            <span className="text-6xl block mb-6">😔</span>
            <h2
              className="text-2xl font-bold mb-3"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Что-то пошло не так
            </h2>
            <p
              className="text-sm mb-6"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Произошла непредвиденная ошибка. Попробуйте обновить страницу или
              вернуться на главную.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="btn-secondary px-6 py-3 text-sm"
              >
                Попробовать снова
              </button>
              <Link href="/" className="btn-primary px-6 py-3 text-sm">
                На главную
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
