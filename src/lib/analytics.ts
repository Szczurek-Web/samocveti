/**
 * Analytics utility — event tracking scaffold.
 *
 * Wire up GA4 and/or Meta Pixel by replacing the stub implementations.
 * All e-commerce events follow the GA4 enhanced e-commerce spec.
 */

type EcommerceItem = {
  id: string;
  name: string;
  price: number;
  category?: string;
  quantity?: number;
};

// ---- GA4 ----
function gtag(...args: unknown[]) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag(...args);
  }
}

// ---- Meta Pixel ----
function fbq(...args: unknown[]) {
  if (typeof window !== 'undefined' && 'fbq' in window) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).fbq(...args);
  }
}

// ---- Public API ----

export function trackViewItem(item: EcommerceItem) {
  gtag('event', 'view_item', {
    currency: 'BYN',
    value: item.price,
    items: [{ item_id: item.id, item_name: item.name, price: item.price, item_category: item.category }],
  });
  fbq('track', 'ViewContent', {
    content_ids: [item.id],
    content_name: item.name,
    content_type: 'product',
    value: item.price,
    currency: 'BYN',
  });
}

export function trackAddToCart(item: EcommerceItem) {
  gtag('event', 'add_to_cart', {
    currency: 'BYN',
    value: item.price,
    items: [{ item_id: item.id, item_name: item.name, price: item.price, quantity: item.quantity || 1 }],
  });
  fbq('track', 'AddToCart', {
    content_ids: [item.id],
    content_name: item.name,
    content_type: 'product',
    value: item.price,
    currency: 'BYN',
  });
}

export function trackBeginCheckout(items: EcommerceItem[], total: number) {
  gtag('event', 'begin_checkout', {
    currency: 'BYN',
    value: total,
    items: items.map((i) => ({
      item_id: i.id,
      item_name: i.name,
      price: i.price,
      quantity: i.quantity || 1,
    })),
  });
  fbq('track', 'InitiateCheckout', {
    content_ids: items.map((i) => i.id),
    num_items: items.length,
    value: total,
    currency: 'BYN',
  });
}

export function trackPurchase(transactionId: string, items: EcommerceItem[], total: number) {
  gtag('event', 'purchase', {
    transaction_id: transactionId,
    currency: 'BYN',
    value: total,
    items: items.map((i) => ({
      item_id: i.id,
      item_name: i.name,
      price: i.price,
      quantity: i.quantity || 1,
    })),
  });
  fbq('track', 'Purchase', {
    content_ids: items.map((i) => i.id),
    content_type: 'product',
    num_items: items.length,
    value: total,
    currency: 'BYN',
  });
}
