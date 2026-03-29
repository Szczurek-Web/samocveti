'use server';

import { prisma } from '@/lib/db';

export async function validatePromo(code: string) {
  if (!code.trim()) return { valid: false, error: 'Введите промокод' };

  const promo = await prisma.promoCode.findUnique({
    where: { code: code.trim().toLowerCase() },
  });

  if (!promo) return { valid: false, error: 'Промокод не найден' };
  if (!promo.isActive) return { valid: false, error: 'Промокод неактивен' };
  if (promo.expiresAt && new Date() > promo.expiresAt) return { valid: false, error: 'Промокод истёк' };
  if (promo.maxUses && promo.usedCount >= promo.maxUses) return { valid: false, error: 'Промокод исчерпан' };

  return { valid: true, discount: promo.discount, code: promo.code };
}

interface OrderInput {
  items: { id: string; name: string; price: number; quantity: number; image: string }[];
  total: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryType: string;
  deliveryAddress?: string;
  paymentMethod: string;
  giftWrap: boolean;
  comment?: string;
  promoCode?: string;
  promoDiscount: number;
}

export async function createOrder(input: OrderInput) {
  // Validate
  if (!input.customerName?.trim()) return { error: 'Укажите имя' };
  if (!input.customerPhone?.trim()) return { error: 'Укажите телефон' };
  if (!input.items?.length) return { error: 'Корзина пуста' };

  // Increment promo usage
  if (input.promoCode) {
    await prisma.promoCode.updateMany({
      where: { code: input.promoCode, isActive: true },
      data: { usedCount: { increment: 1 } },
    });
  }

  const order = await prisma.order.create({
    data: {
      total: input.total,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      customerEmail: input.customerEmail || null,
      deliveryType: input.deliveryType,
      deliveryAddress: input.deliveryAddress || null,
      paymentMethod: input.paymentMethod,
      giftWrap: input.giftWrap,
      comment: input.comment || null,
      promoCode: input.promoCode || null,
      promoDiscount: input.promoDiscount,
      items: input.items as any,
    },
  });

  return { success: true, orderNumber: order.id.slice(-8).toUpperCase() };
}
