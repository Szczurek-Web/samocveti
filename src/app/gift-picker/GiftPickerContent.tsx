'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/data/products';
import ProductCard from '@/components/catalog/ProductCard';

interface QuizStep {
  id: string;
  question: string;
  options: { value: string; label: string; icon: string }[];
}

const quizSteps: QuizStep[] = [
  {
    id: 'recipient',
    question: 'Кому вы ищете подарок?',
    options: [
      { value: 'Женщине', label: 'Женщине', icon: '👩' },
      { value: 'Мужчине', label: 'Мужчине', icon: '👨' },
      { value: 'Коллеге', label: 'Коллеге', icon: '💼' },
      { value: 'Другу', label: 'Другу', icon: '🤝' },
      { value: 'Начальнику', label: 'Начальнику', icon: '👔' },
    ],
  },
  {
    id: 'occasion',
    question: 'По какому поводу?',
    options: [
      { value: 'День рождения', label: 'День рождения', icon: '🎂' },
      { value: 'Юбилей', label: 'Юбилей', icon: '🎉' },
      { value: '8 марта', label: '8 марта', icon: '🌷' },
      { value: '23 февраля', label: '23 февраля', icon: '⭐' },
      { value: 'Новоселье', label: 'Новоселье', icon: '🏠' },
      { value: 'Новый год', label: 'Новый год', icon: '🎄' },
      { value: 'Без повода', label: 'Без повода', icon: '💝' },
    ],
  },
  {
    id: 'budget',
    question: 'Ваш бюджет?',
    options: [
      { value: '0-100', label: 'До 100 BYN', icon: '💰' },
      { value: '100-250', label: '100–250 BYN', icon: '💰💰' },
      { value: '250-500', label: '250–500 BYN', icon: '💰💰💰' },
      { value: '500-9999', label: '500+ BYN', icon: '👑' },
    ],
  },
  {
    id: 'type',
    question: 'Какой тип изделия?',
    options: [
      { value: 'jewelry', label: 'Украшение', icon: '💍' },
      { value: 'decoration', label: 'Декор / Интерьер', icon: '🖼️' },
      { value: 'souvenir', label: 'Сувенир', icon: '🎁' },
      { value: 'any', label: 'Любой', icon: '✨' },
    ],
  },
];

export default function GiftPickerContent({ products }: { products: Product[] }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleSelect = (stepId: string, value: string) => {
    const newAnswers = { ...answers, [stepId]: value };
    setAnswers(newAnswers);

    if (currentStep < quizSteps.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const results = useMemo(() => {
    if (!showResults) return [];

    let filtered = [...products];

    if (answers.recipient) {
      filtered = filtered.filter((p) => p.suitableFor.includes(answers.recipient));
    }
    if (answers.occasion) {
      filtered = filtered.filter((p) => p.occasion?.includes(answers.occasion));
    }
    if (answers.budget) {
      const [min, max] = answers.budget.split('-').map(Number);
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);
    }
    if (answers.type && answers.type !== 'any') {
      filtered = filtered.filter((p) => p.type === answers.type);
    }

    if (filtered.length < 2) {
      filtered = products.filter((p) => p.suitableFor.includes(answers.recipient || ''));
      if (answers.budget) {
        const [min, max] = answers.budget.split('-').map(Number);
        filtered = filtered.filter((p) => p.price >= min && p.price <= max);
      }
    }

    return filtered.slice(0, 6);
  }, [showResults, answers]);

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const progress = showResults ? 100 : ((currentStep + 1) / (quizSteps.length + 1)) * 100;

  return (
    <div className="pt-24 min-h-screen flex flex-col bg-[var(--color-bg)]">
      <div className="container flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="mb-2">
            {showResults ? '🎁 Ваша подборка' : '🎁 Подбор подарка'}
          </h1>
          <p className="text-reading mx-auto">
            {showResults
              ? 'Мы подобрали идеальные варианты для вас'
              : 'Ответьте на несколько вопросов, и мы подберём идеальный подарок'}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xl mx-auto h-2 rounded-full mb-12 overflow-hidden bg-[var(--color-border)]">
          <div
            className="h-full rounded-full transition-all duration-500 bg-[var(--color-primary)] shadow-[0_0_10px_var(--color-primary)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {showResults ? (
          <div className="animated-fadeIn w-full max-w-6xl mx-auto">
            {results.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {results.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                <div className="text-center">
                  <button onClick={resetQuiz} className="btn-secondary px-8">
                    Собрать новую подборку
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-16 card mx-auto max-w-2xl bg-[var(--color-surface)]">
                <span className="text-6xl mb-6 block opacity-50">😔</span>
                <h3 className="text-xl mb-4">
                  К сожалению, точных совпадений не нашлось
                </h3>
                <p className="mb-8 text-reading mx-auto">
                  Попробуйте изменить параметры или посмотрите весь каталог
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={resetQuiz} className="btn-secondary w-full sm:w-auto">
                    Попробовать снова
                  </button>
                  <Link href="/catalog" className="btn-primary w-full sm:w-auto">
                    Весь каталог
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto w-full">
            {quizSteps.map((step, stepIndex) => (
              <div
                key={step.id}
                style={{
                  display: stepIndex === currentStep ? 'block' : 'none',
                  animation: 'fadeIn var(--transition-page) both',
                }}
              >
                {/* Step number */}
                <div className="text-center mb-10">
                  <span className="badge badge-primary mb-4 text-[12px] uppercase tracking-widest px-4 py-2">
                    Шаг {stepIndex + 1} из {quizSteps.length}
                  </span>
                  <h2>{step.question}</h2>
                </div>

                {/* Options */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {step.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSelect(step.id, option.value)}
                      className="card cursor-pointer flex flex-col items-center justify-center p-8 transition-all hover:scale-[1.03] active:scale-95"
                      style={{
                        background: answers[step.id] === option.value ? 'rgba(212,168,83,0.1)' : 'var(--color-surface)',
                        borderColor: answers[step.id] === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                        color: 'white',
                      }}
                    >
                      <span className="text-4xl mb-4">{option.icon}</span>
                      <span className="font-semibold">{option.label}</span>
                    </button>
                  ))}
                </div>

                {/* Back button */}
                <div className="text-center mt-12 min-h-12">
                  {stepIndex > 0 && (
                    <button onClick={() => setCurrentStep(currentStep - 1)} className="btn-tertiary text-gray-400">
                      ← Назад
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="h-24" />
      </div>
    </div>
  );
}
