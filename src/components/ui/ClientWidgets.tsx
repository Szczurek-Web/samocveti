'use client';

import dynamic from 'next/dynamic';

const FloatingMessenger = dynamic(() => import('@/components/ui/FloatingMessenger'), { ssr: false });
const ToastContainer = dynamic(() => import('@/components/ui/ToastContainer'), { ssr: false });

export default function ClientWidgets() {
  return (
    <>
      <FloatingMessenger />
      <ToastContainer />
    </>
  );
}
