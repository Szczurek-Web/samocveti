'use client';

import { useState } from 'react';
import { loginAction } from './actions';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div 
        className="p-8 rounded-2xl w-full max-w-sm"
        style={{ 
          background: 'var(--color-bg-card)', 
          border: '1px solid var(--color-border)' 
        }}
      >
        <h1 
          className="text-2xl font-bold mb-6 text-center" 
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)' }}
        >
          Вход в панель
        </h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm mb-2 text-gray-400">Пароль</label>
            <input 
              type="password" 
              name="password"
              className="w-full px-4 py-3 rounded-xl outline-none"
              style={{
                background: 'var(--color-bg-hover)',
                border: '1px solid var(--color-border)',
                color: '#fff'
              }}
              required 
            />
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 rounded-xl font-medium mt-2 transition-opacity"
            style={{
              background: 'var(--color-gold)',
              color: '#000',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}
