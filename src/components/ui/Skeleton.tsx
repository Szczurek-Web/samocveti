'use client';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  count?: number;
}

export default function Skeleton({
  className = '',
  width,
  height,
  borderRadius = '8px',
  count = 1,
}: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`skeleton ${className}`}
          style={{
            width: width || '100%',
            height: height || '20px',
            borderRadius,
          }}
        />
      ))}
    </>
  );
}

export function ProductCardSkeleton() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
      }}
    >
      <div className="skeleton" style={{ height: '240px', borderRadius: 0 }} />
      <div className="p-5">
        <Skeleton width="40%" height="12px" className="mb-3" />
        <Skeleton width="80%" height="16px" className="mb-2" />
        <Skeleton width="60%" height="14px" className="mb-4" />
        <div className="flex items-center justify-between">
          <Skeleton width="80px" height="24px" />
          <Skeleton width="40px" height="40px" borderRadius="12px" />
        </div>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="container">
        {/* Breadcrumbs */}
        <div className="flex gap-2 mb-8">
          <Skeleton width="60px" height="14px" />
          <Skeleton width="60px" height="14px" />
          <Skeleton width="120px" height="14px" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div>
            <div
              className="skeleton rounded-2xl mb-4"
              style={{ height: '500px', borderRadius: '16px' }}
            />
            <div className="flex gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="skeleton"
                  style={{ width: '80px', height: '80px', borderRadius: '12px' }}
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <Skeleton width="80px" height="14px" className="mb-3" />
            <Skeleton width="90%" height="32px" className="mb-2" />
            <Skeleton width="70%" height="32px" className="mb-6" />
            <div className="flex gap-3 mb-6">
              <Skeleton width="100px" height="20px" />
              <Skeleton width="80px" height="20px" />
            </div>
            <Skeleton width="150px" height="36px" className="mb-8" />
            <div className="flex gap-3 mb-8">
              <Skeleton width="100%" height="52px" borderRadius="12px" />
              <Skeleton width="100%" height="52px" borderRadius="12px" />
            </div>
            <div
              className="skeleton rounded-2xl"
              style={{ height: '200px', borderRadius: '16px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
