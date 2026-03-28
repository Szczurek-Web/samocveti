'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';

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

export default function GiftPickerPage() {
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

    // If too few results, relax filters
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
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--color-bg)', paddingTop: '100px' }}
    >
      <div className="container flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {showResults ? '🎁 Ваша подборка' : '🎁 Подбор подарка'}
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            {showResults
              ? 'Мы подобрали идеальные варианты для вас'
              : 'Ответьте на несколько вопросов, и мы подберём идеальный подарок'}
          </p>
        </div>

        {/* Progress bar */}
        <div
          className="w-full max-w-xl mx-auto h-1.5 rounded-full mb-12 overflow-hidden"
          style={{ background: 'var(--color-border)' }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, var(--color-gold-dark), var(--color-gold))',
            }}
          />
        </div>

        {showResults ? (
          /* Results */
          <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            {results.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                  {results.map((product, i) => (
                    <div
                      key={product.id}
                      className="rounded-2xl overflow-hidden transition-all duration-300"
                      style={{
                        background: 'var(--color-bg-card)',
                        border: '1px solid var(--color-border)',
                        animation: `slideUp 0.5s ease-out ${i * 0.1}s both`,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                      }}
                    >
                      <Link href={`/product/${product.slug}`} className="block no-underline">
                        <div
                          className="relative h-[200px] flex items-center justify-center overflow-hidden group"
                          style={{ background: 'var(--color-bg-hover)' }}
                        >
                          <div
                            className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                            style={{
                              backgroundImage: `url(${product.images[0]})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }}
                          />
                          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
                        </div>
                      </Link>
                      <div className="p-5">
                        <div className="text-xs mb-1" style={{ color: 'var(--color-gold)' }}>
                          {product.stone.name}
                        </div>
                        <Link
                          href={`/product/${product.slug}`}
                          className="block no-underline text-sm font-medium mb-3"
                          style={{ color: 'var(--color-text)' }}
                        >
                          {product.name}
                        </Link>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold" style={{ color: 'var(--color-gold)' }}>
                            {formatPrice(product.price)}
                          </span>
                          <button
                            onClick={() =>
                              addItem({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.images[0],
                              })
                            }
                            className="btn-primary text-sm px-4 py-2"
                          >
                            В корзину
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button onClick={resetQuiz} className="btn-secondary px-8 py-3">
                    Подобрать снова
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <span className="text-6xl mb-6 block">😔</span>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                  К сожалению, точных совпадений не нашлось
                </h3>
                <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                  Попробуйте изменить параметры или посмотрите весь каталог
                </p>
                <div className="flex gap-4 justify-center">
                  <button onClick={resetQuiz} className="btn-secondary px-6 py-3">
                    Попробовать снова
                  </button>
                  <Link href="/catalog" className="btn-primary px-6 py-3">
                    Весь каталог
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Quiz steps */
          <div className="max-w-3xl mx-auto w-full">
            {quizSteps.map((step, stepIndex) => (
              <div
                key={step.id}
                style={{
                  display: stepIndex === currentStep ? 'block' : 'none',
                  animation: 'fadeIn 0.4s ease-out',
                }}
              >
                {/* Step number */}
                <div className="text-center mb-8">
                  <span
                    className="inline-block text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full mb-4"
                    style={{
                      background: 'rgba(212,168,83,0.1)',
                      color: 'var(--color-gold)',
                      border: '1px solid rgba(212,168,83,0.2)',
                    }}
                  >
                    Шаг {stepIndex + 1} из {quizSteps.length}
                  </span>
                  <h2
                    className="text-2xl md:text-3xl font-bold"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {step.question}
                  </h2>
                </div>

                {/* Options */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {step.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSelect(step.id, option.value)}
                      className="flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl transition-all duration-300"
                      style={{
                        background:
                          answers[step.id] === option.value
                            ? 'rgba(212,168,83,0.1)'
                            : 'var(--color-bg-card)',
                        border:
                          answers[step.id] === option.value
                            ? '2px solid var(--color-gold)'
                            : '1px solid var(--color-border)',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-gold-dark)';
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          answers[step.id] === option.value ? 'var(--color-gold)' : 'var(--color-border)';
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                      }}
                    >
                      <span className="text-3xl mb-3">{option.icon}</span>
                      <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Back button */}
                {stepIndex > 0 && (
                  <div className="text-center mt-8">
                    <button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="text-sm"
                      style={{
                        color: 'var(--color-text-muted)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      ← Назад
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="h-20" />
      </div>
    </div>
  );
}
