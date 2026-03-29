# Техническая документация проекта **Samocveti**

## 1. Обзор проекта

**Samocveti** — это витринный e-commerce веб‑сайт на Next.js (App Router) для продажи подарков и изделий из натурального камня. Приложение включает каталог, карточку товара, корзину, оформление заказа, блог, подбор подарка и контентные страницы.

Ключевая архитектурная особенность: серверный каркас (маршруты/SSR-метаданные) + интерактивные клиентские экраны и локальное состояние (Zustand с persist в localStorage).

---

## 2. Технологический стек

- **Framework:** Next.js `16.2.1` (App Router).
- **UI:** React `19.2.4`, React DOM `19.2.4`.
- **Язык:** TypeScript (strict mode).
- **Стили:** Tailwind CSS v4 + расширенный кастомный CSS (design tokens, utility classes, анимации).
- **State management:** Zustand `^5.0.12` + middleware `persist`.
- **Lint:** ESLint v9 + `eslint-config-next` (core web vitals + typescript).

---

## 3. Запуск и команды

### 3.1 Требования
- Node.js LTS (рекомендуется 20+).
- npm.

### 3.2 Скрипты
- `npm run dev` — запуск dev-сервера.
- `npm run build` — production сборка.
- `npm run start` — запуск production сервера.
- `npm run lint` — проверка ESLint.

---

## 4. Структура проекта

```text
src/
  app/                  # маршруты Next.js App Router
  components/
    home/               # блоки главной страницы
    catalog/            # карточка товара каталога
    layout/             # Header/Footer
    ui/                 # toasts, error boundary, skeleton, floating messenger
  data/                 # статические датасеты: товары, блог
  hooks/                # прикладные хуки
  lib/                  # утилиты и аналитика
  store/                # Zustand stores
public/images/          # изображения товаров/категорий
```

Архитектурно проект организован как SPA-подобный интерфейс поверх маршрутов App Router, где большая часть пользовательской логики живёт в client components.

---

## 5. Конфигурация и системные настройки

### 5.1 TypeScript
- `strict: true`.
- алиас `@/* -> ./src/*`.
- `moduleResolution: bundler`.

### 5.2 Next.js
- `next.config.ts` оставлен практически дефолтным (без кастомных runtime/webpack оптимизаций).

### 5.3 ESLint
- Используется базовый пресет Next.js + TypeScript + Core Web Vitals.

---

## 6. Дизайн-система и стили

Глобальные стили (`src/app/globals.css`) задают:

- тему (dark luxury): палитра `bg/gold/emerald/text/border`.
- токены радиусов, теней, переходов.
- кастомные классы: `btn-primary`, `btn-secondary`, `badge`, `glass`, `card`, `divider`, `skeleton`, `stepper`, `payment-option` и др.
- анимации: `fadeIn`, `slideUp`, `shimmer`, `pulseGold`, `float`, `scaleIn`, `confettiDrop`.

Tailwind v4 подключён через `@import "tailwindcss"` и `@theme`-токены.

---

## 7. Маршрутизация (App Router)

## 7.1 Основные страницы

- `/` — главная: Hero, quick picks, категории, USP, популярные товары, отзывы, контакты.
- `/catalog` — каталог с фильтрами и сортировкой (client).
- `/product/[slug]` — карточка товара, SSG params + динамические метаданные.
- `/cart` — корзина.
- `/checkout` — пошаговый checkout.
- `/favorites` — избранное.
- `/gift-picker` — мастер подбора подарка.
- `/blog` — список статей.
- `/blog/[slug]` — детальная статья.
- `/about`, `/delivery`, `/contacts` — контентные страницы.

## 7.2 SEO маршруты
- `/sitemap.xml` через `src/app/sitemap.ts`.
- `/robots.txt` через `src/app/robots.ts`.

## 7.3 Layout
`src/app/layout.tsx`:
- глобальные Google fonts (Inter + Playfair Display).
- общие оболочки: `Header`, `Footer`, `FloatingMessenger`, `ToastContainer`, `ErrorBoundary`.
- базовые metadata/OpenGraph с `metadataBase = https://samocveti.by`.

---

## 8. Данные и доменная модель

## 8.1 Товары (`src/data/products.ts`)

### Основные интерфейсы
- `StoneInfo`.
- `Product`.
- `Review`.

### Справочники
- `categories` (5 категорий: картины, часы, сувениры, украшения, интерьер).
- `stones`, `occasions`, `recipients`.
- `quickPicks` для быстрых сценариев на главной.

### Датасет
- Статический массив `products` (20 SKU с rich‑метаданными).
- Статический массив `reviews` (отзывы для social proof).

### Функции доступа/поиска
- `getProductsByCategory`, `getProductById`, `getProductBySlug`.
- `getPopularProducts`, `getNewProducts`.
- `searchProducts(filters)` с фильтрами и сортировками.

> Данные хранятся в коде, без внешней БД/API.

## 8.2 Блог (`src/data/blog.ts`)
- `BlogPost`.
- Массив `blogPosts` (4 публикации).
- `getBlogPost(slug)`.

Контент статей — markdown‑подобный plain text, который в UI вручную разбирается на параграфы/блоки.

---

## 9. Управление состоянием (Zustand)

## 9.1 Cart store (`useCartStore`)
Persist key: `samocveti-cart`.

Содержит:
- `items: CartItem[]`.
- `addItem`, `removeItem`, `updateQuantity`, `clearCart`.
- derived getters `getTotal`, `getItemCount`.

Логика `addItem`: инкремент quantity при повторном добавлении.

## 9.2 Favorites store (`useFavoritesStore`)
Persist key: `samocveti-favorites`.

Содержит:
- `favorites: string[]`.
- `toggleFavorite`, `isFavorite`, `clearFavorites`.

## 9.3 Recent store (`useRecentStore`)
Persist key: `samocveti-recent`.

Содержит:
- `recentIds: string[]` (до 8 последних ID).
- `addRecent` с дедупликацией и ограничением длины.

## 9.4 Toast store (`useToastStore`)
- не persist.
- `addToast(message, type)` + автоудаление через `setTimeout(3000)`.
- `removeToast(id)`.

---

## 10. UI-компоненты

## 10.1 Layout
- `Header`: навигация, мобильное меню, бейджи количества корзины/избранного.
- `Footer`: секции ссылок и контактная информация.

## 10.2 Каталог/товары
- `ProductCard`: карточка продукта (цена, бейджи, CTA).
- `CatalogContent`: фильтрация/сортировка/мобильные фильтры.
- `ProductContent`: детальная карточка товара, галерея, описание, характеристики, блоки related/cross-sell/recent, соцдоказательства, CTA.

## 10.3 Главная
- Hero, quick picks, категории, USP, популярные товары, отзывы, контакты — отдельными компонентами.

## 10.4 UI сервисные
- `ToastContainer`: визуализация уведомлений.
- `FloatingMessenger`: плавающая кнопка мессенджеров.
- `ErrorBoundary`: клиентская защита от runtime ошибок UI-дерева.
- `Skeleton`: заготовки скелетонов для загрузки.

---

## 11. Ключевые пользовательские сценарии

1. **Просмотр каталога:** фильтры (категория, камень, повод, получатель, цена) + сортировки (популярные/новые/по цене).
2. **Карточка товара:** просмотр фото, деталей камня, добавление в корзину, избранное, быстрый переход к покупке.
3. **Корзина:** изменение количества, удаление, очистка, переход на checkout.
4. **Оформление заказа:** многошаговый flow с параметрами доставки/оплаты/упаковки и подтверждением.
5. **Подбор подарка:** квиз по получателю/поводу/бюджету/типу с выдачей релевантных товаров.
6. **Контент:** блог + информационные страницы.

---

## 12. SEO и индексация

- Базовые metadata + OpenGraph в `layout.tsx`.
- Метаданные товара в `product/[slug]/page.tsx`.
- Статически сгенерированные params для товарных страниц (`generateStaticParams`).
- `sitemap.ts` генерирует URL для статических страниц, товаров и блога.
- `robots.ts` закрывает `cart` и `checkout` от индексации.

---

## 13. Аналитика и трекинг

`src/lib/analytics.ts` содержит scaffold событий e-commerce для:
- GA4 (`gtag`) и
- Meta Pixel (`fbq`).

Реализованы функции:
- `trackViewItem`.
- `trackAddToCart`.
- `trackBeginCheckout`.
- `trackPurchase`.

Особенность: это инфраструктурный слой-шаблон; необходима фактическая инициализация скриптов аналитики в layout или через next/script.

---

## 14. Ограничения текущей реализации

1. **Нет backend/API и БД** — весь каталог статический.
2. **Checkout демо-уровня** — без интеграции платежей, OMS/CRM, email/SMS.
3. **Данные persisted только в браузере** — нет синхронизации между устройствами.
4. **Нет автоматизированных тестов** (unit/integration/e2e).
5. **Некоторые ссылки/соц. интеграции заглушечные** (например, соцссылки в футере).
6. **Потенциальный роутинг-дефект в корзине:** ссылка на карточку формируется как `/product/${item.id}`, тогда как реальный маршрут ожидает `slug`.

---

## 15. Рекомендации по развитию

## 15.1 Backend и данные
- Вынести товары/заказы в БД (PostgreSQL + Prisma/Supabase).
- Добавить API слой (Route Handlers / tRPC).
- Реализовать админ-панель для контента и товарного каталога.

## 15.2 Коммерческие интеграции
- Онлайн-оплаты (например, WebPay/Stripe/CloudPayments в зависимости от юрисдикции).
- Фискализация, промокоды, реальные остатки, доставка (СДЭК/Европочта API и т.п.).

## 15.3 Качество и наблюдаемость
- Unit tests: stores, фильтры, utility.
- E2E tests: каталог → корзина → checkout.
- Sentry/LogRocket для runtime ошибок и UX‑телеметрии.

## 15.4 Производительность
- Проверить изображения на `next/image` везде (часть карточек использует background image div).
- Вынести тяжёлые client-only блоки через dynamic import.
- Добавить explicit caching/revalidation strategy для будущих API данных.

## 15.5 Accessibility
- Контраст и focus-visible для интерактивных элементов.
- Улучшить ARIA на кастомных контролах фильтра/чекаута.

---

## 16. Быстрый onboarding для разработчика

1. `npm install`
2. `npm run dev`
3. Открыть `http://localhost:3000`
4. Начинать с:
   - `src/app/layout.tsx` — общий каркас.
   - `src/data/products.ts` — доменные данные каталога.
   - `src/store/*.ts` — состояние корзины/избранного.
   - `src/app/catalog/CatalogContent.tsx` и `src/app/product/[slug]/ProductContent.tsx` — основной shopping UX.

---

## 17. Диаграмма зависимостей (упрощённо)

```text
app/layout
 ├─ Header -> cartStore/favoritesStore
 ├─ Footer
 ├─ FloatingMessenger
 ├─ ToastContainer -> toastStore
 └─ ErrorBoundary

catalog/page -> CatalogContent
CatalogContent -> products data + ProductCard
ProductCard -> useProductActions -> cartStore/favoritesStore/toastStore

product/[slug]/page -> ProductContent
ProductContent -> products data + cartStore/favoritesStore/recentStore/toastStore

cart/checkout/favorites/gift-picker -> stores + products data
blog pages -> blog data
```

---

## 18. Статус проекта

Текущее состояние можно охарактеризовать как **качественный frontend MVP витрины интернет-магазина**:
- сильная визуальная часть;
- хорошая UX-интерактивность;
- понятная локальная архитектура;
- отсутствует production-ready backend e-commerce контур.
