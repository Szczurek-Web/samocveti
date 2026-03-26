'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPost, blogPosts } from '@/data/blog';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ background: 'var(--color-bg)' }}
      >
        <span className="text-6xl mb-4">📄</span>
        <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          Статья не найдена
        </h1>
        <Link href="/blog" className="btn-primary px-6 py-3">
          Все статьи
        </Link>
      </div>
    );
  }

  // Parse content into paragraphs and bold sections
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, i) => {
      if (paragraph.startsWith('**') && paragraph.includes(':**')) {
        return (
          <h3
            key={i}
            className="text-lg font-bold mt-8 mb-3"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)' }}
          >
            {paragraph.replace(/\*\*/g, '')}
          </h3>
        );
      }
      if (paragraph.startsWith('- ')) {
        return (
          <ul key={i} className="flex flex-col gap-2 my-4 ml-4">
            {paragraph.split('\n').map((li, j) => (
              <li
                key={j}
                className="flex items-start gap-2 text-base leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <span style={{ color: 'var(--color-gold)' }}>✦</span>
                {li.replace(/^- /, '')}
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={i} className="text-base leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
          {paragraph.split('**').map((part, j) =>
            j % 2 === 1 ? (
              <strong key={j} style={{ color: 'var(--color-text)' }}>
                {part}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      );
    });
  };

  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
          <Link href="/" className="no-underline hover:underline" style={{ color: 'inherit' }}>
            Главная
          </Link>
          <span>/</span>
          <Link href="/blog" className="no-underline hover:underline" style={{ color: 'inherit' }}>
            Блог
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--color-text-secondary)' }}>{post.title}</span>
        </nav>

        {/* Article */}
        <article className="max-w-3xl mx-auto">
          {/* Hero image */}
          <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 50%)',
              }}
            />
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {new Date(post.date).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              • {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl font-bold mb-8"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {post.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span key={tag} className="badge">
                {tag}
              </span>
            ))}
          </div>

          {/* Content */}
          <div className="mb-16">{renderContent(post.content)}</div>

          {/* Divider */}
          <div className="divider my-12" />

          {/* Related */}
          {otherPosts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                Ещё статьи
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {otherPosts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="block no-underline p-5 rounded-2xl transition-all duration-300"
                    style={{
                      background: 'var(--color-bg-card)',
                      border: '1px solid var(--color-border)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-gold-dark)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    }}
                  >
                    <div className="text-xs mb-2" style={{ color: 'var(--color-text-muted)' }}>
                      {p.readTime}
                    </div>
                    <div
                      className="text-sm font-semibold mb-2"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {p.title}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      {p.excerpt.slice(0, 100)}...
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
