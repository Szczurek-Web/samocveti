'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const FloatingMessenger = dynamic(() => import('@/components/ui/FloatingMessenger'), { ssr: false });
const ToastContainer = dynamic(() => import('@/components/ui/ToastContainer'), { ssr: false });

export default function ClientWidgets() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <FloatingMessenger />}
      <ToastContainer />
    </>
  );
}
