'use client';

import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blog';

export default function BlogPage() {
  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Блог <span className="gradient-gold-text">Samocveti</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Полезные статьи о натуральных камнях, уходе за изделиями и подборе подарков
          </p>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {blogPosts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block no-underline rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                animation: `fadeIn 0.5s ease-out ${i * 0.1}s both`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-light)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
              }}
            >
              {/* Image */}
              <div className="relative h-[220px] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 60%)',
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {new Date(post.date).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    •
                  </span>
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {post.readTime}
                  </span>
                </div>

                <h2
                  className="text-lg font-bold mb-2 group-hover:text-gold-400 transition-colors"
                  style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}
                >
                  {post.title}
                </h2>

                <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="badge text-[10px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="h-10" />
      </div>
    </div>
  );
}
