export interface StoneInfo {
  name: string;
  properties: string;
  symbolism: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
  images: string[];
  category: string;
  stone: StoneInfo;
  description: {
    short: string[];
    full: string;
  };
  tags: string[];
  rating: number;
  reviewCount: number;
  suitableFor: string[];
  isNew?: boolean;
  isPopular?: boolean;
  occasion?: string[];
  type?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  productName?: string;
}

export const categories = [
  { id: 'paintings', name: 'Картины', slug: 'paintings', icon: '🖼️', image: '/images/cat-paintings.png' },
  { id: 'clocks', name: 'Часы', slug: 'clocks', icon: '🕐', image: '/images/cat-clocks.png' },
  { id: 'souvenirs', name: 'Сувениры', slug: 'souvenirs', icon: '🎁', image: '/images/cat-souvenirs.png' },
  { id: 'jewelry', name: 'Украшения', slug: 'jewelry', icon: '💎', image: '/images/cat-jewelry.png' },
  { id: 'interior', name: 'Интерьер', slug: 'interior', icon: '🏠', image: '/images/cat-interior.png' },
];

export const quickPicks = [
  { id: 'for-woman', label: 'Подарок женщине', icon: '👩', color: '#8b2252' },
  { id: 'for-man', label: 'Подарок мужчине', icon: '👨', color: '#2d6b4f' },
  { id: 'birthday', label: 'На день рождения', icon: '🎂', color: '#d4a853' },
  { id: 'budget', label: 'До 100 BYN', icon: '💰', color: '#6b6358' },
  { id: 'premium', label: 'Премиум', icon: '👑', color: '#b08a3a' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Картина "Горный пейзаж" из яшмы',
    slug: 'kartina-gornyj-pejzazh-yashma',
    price: 280,
    oldPrice: 350,
    images: ['/images/product-1.png'],
    category: 'paintings',
    stone: {
      name: 'Яшма',
      properties: 'Непрозрачный камень с богатой палитрой цветов. Твёрдость 6.5-7 по шкале Мооса.',
      symbolism: 'Камень мудрости и спокойствия. Защищает от негативной энергии и приносит удачу.'
    },
    description: {
      short: ['Размер 30×40 см', 'Натуральная яшма', 'Ручная работа мастера', 'В деревянной раме'],
      full: 'Уникальная картина, созданная из натуральной яшмы. Каждый камень подобран вручную для создания неповторимого горного пейзажа. Деревянная рама из массива дуба подчёркивает благородство изделия.'
    },
    tags: ['для женщины', 'для мужчины', 'премиум', 'интерьер'],
    rating: 4.9,
    reviewCount: 24,
    suitableFor: ['Женщине', 'Мужчине', 'Начальнику', 'В подарок на юбилей'],
    isPopular: true,
    occasion: ['День рождения', 'Юбилей', 'Новоселье'],
    type: 'decoration',
  },
  {
    id: '2',
    name: 'Часы настольные из малахита',
    slug: 'chasy-nastolnye-malahit',
    price: 420,
    images: ['/images/product-2.png'],
    category: 'clocks',
    stone: {
      name: 'Малахит',
      properties: 'Зеленый минерал с характерным полосчатым рисунком. Твёрдость 3.5-4 по шкале Мооса.',
      symbolism: 'Камень перемен и преобразования. Символизирует рост и обновление.'
    },
    description: {
      short: ['Высота 18 см', 'Натуральный малахит', 'Кварцевый механизм', 'Латунная фурнитура'],
      full: 'Элегантные настольные часы из натурального малахита с латунной фурнитурой. Кварцевый механизм обеспечивает точный ход. Каждое изделие уникально благодаря неповторимому рисунку камня.'
    },
    tags: ['для мужчины', 'премиум', 'классика'],
    rating: 4.8,
    reviewCount: 18,
    suitableFor: ['Мужчине', 'Начальнику', 'Партнёру'],
    isPopular: true,
    occasion: ['День рождения', 'Юбилей', '23 февраля'],
    type: 'decoration',
  },
  {
    id: '3',
    name: 'Бусы из розового кварца',
    slug: 'busy-rozovyj-kvarc',
    price: 85,
    oldPrice: 110,
    images: ['/images/product-3.png'],
    category: 'jewelry',
    stone: {
      name: 'Розовый кварц',
      properties: 'Полупрозрачный камень нежно-розового цвета. Твёрдость 7 по шкале Мооса.',
      symbolism: 'Камень любви и нежности. Помогает раскрыть сердце и привлечь любовь.'
    },
    description: {
      short: ['Длина 45 см', 'Натуральный розовый кварц', 'Серебряная застёжка 925', 'Бусины 8 мм'],
      full: 'Изысканные бусы из натурального розового кварца. Каждая бусина отполирована вручную до зеркального блеска. Застёжка из серебра 925 пробы.'
    },
    tags: ['для женщины', 'романтика', 'украшения'],
    rating: 4.7,
    reviewCount: 32,
    suitableFor: ['Женщине', 'Девушке', 'Маме'],
    isNew: true,
    occasion: ['8 марта', 'День рождения', '14 февраля'],
    type: 'jewelry',
  },
  {
    id: '4',
    name: 'Шкатулка из оникса',
    slug: 'shkatulka-oniks',
    price: 150,
    images: ['/images/product-4.png', '/images/product-4-2.png'],
    category: 'souvenirs',
    stone: {
      name: 'Оникс',
      properties: 'Полупрозрачный камень с характерным полосчатым рисунком. Твёрдость 6.5-7.',
      symbolism: 'Камень силы и уверенности. Помогает принимать верные решения.'
    },
    description: {
      short: ['Размер 12×8×6 см', 'Натуральный оникс', 'Латунные петли', 'Бархатная подкладка'],
      full: 'Элегантная шкатулка из натурального оникса с бархатной подкладкой внутри. Латунные петли и замочек добавляют изделию утончённости.'
    },
    tags: ['для женщины', 'сувенир', 'практичное'],
    rating: 4.6,
    reviewCount: 15,
    suitableFor: ['Женщине', 'Маме', 'Коллеге'],
    isPopular: true,
    occasion: ['8 марта', 'День рождения', 'Без повода'],
    type: 'souvenir',
  },
  {
    id: '5',
    name: 'Панно "Дерево жизни" из аметиста',
    slug: 'panno-derevo-zhizni-ametist',
    price: 540,
    images: ['/images/product-5.png', '/images/product-5-2.png'],
    category: 'paintings',
    stone: {
      name: 'Аметист',
      properties: 'Прозрачный кварц фиолетового цвета. Твёрдость 7 по шкале Мооса.',
      symbolism: 'Камень духовности и мудрости. Защищает от дурных мыслей, способствует медитации.'
    },
    description: {
      short: ['Размер 50×40 см', 'Натуральный аметист', 'Драгоценная проволока', 'Рама из красного дерева'],
      full: 'Великолепное панно "Дерево жизни" из натурального аметиста на латунной проволоке. Каждый кристалл закреплён вручную, создавая объёмную композицию.'
    },
    tags: ['премиум', 'для женщины', 'для мужчины', 'эксклюзив'],
    rating: 5.0,
    reviewCount: 8,
    suitableFor: ['Женщине', 'Мужчине', 'На юбилей', 'Начальнику'],
    isPopular: true,
    occasion: ['Юбилей', 'Новоселье', 'Свадьба'],
    type: 'decoration',
  },
  {
    id: '6',
    name: 'Браслет из тигрового глаза',
    slug: 'braslet-tigrovyj-glaz',
    price: 65,
    images: ['/images/product-6.png', '/images/product-6-2.png'],
    category: 'jewelry',
    stone: {
      name: 'Тигровый глаз',
      properties: 'Камень с характерным золотисто-коричневым переливом. Твёрдость 7.',
      symbolism: 'Камень защиты и удачи. Помогает в финансовых делах и придаёт уверенность.'
    },
    description: {
      short: ['Размер регулируемый', 'Натуральный тигровый глаз', 'Бусины 10 мм', 'Ручная полировка'],
      full: 'Стильный браслет из натурального тигрового глаза. Камни обработаны вручную с сохранением природного переливающегося рисунка.'
    },
    tags: ['для мужчины', 'для женщины', 'доступный'],
    rating: 4.5,
    reviewCount: 41,
    suitableFor: ['Мужчине', 'Женщине', 'Другу', 'Коллеге'],
    isNew: true,
    occasion: ['День рождения', 'Без повода', '23 февраля'],
    type: 'jewelry',
  },
  {
    id: '7',
    name: 'Статуэтка "Слон" из нефрита',
    slug: 'statuetka-slon-nefrit',
    price: 195,
    images: ['/images/product-7.png'],
    category: 'souvenirs',
    stone: {
      name: 'Нефрит',
      properties: 'Плотный камень зелёного оттенка с восковым блеском. Твёрдость 6-6.5.',
      symbolism: 'Камень гармонии и благополучия. В восточной культуре ценится превыше золота.'
    },
    description: {
      short: ['Высота 15 см', 'Натуральный нефрит', 'Резьба вручную', 'Подставка из мрамора'],
      full: 'Статуэтка слона, вырезанная вручную из цельного куска натурального нефрита. Слон — символ мудрости, силы и удачи.'
    },
    tags: ['для мужчины', 'для женщины', 'фэн-шуй'],
    rating: 4.8,
    reviewCount: 12,
    suitableFor: ['Женщине', 'Мужчине', 'Начальнику', 'На новоселье'],
    occasion: ['Новоселье', 'День рождения', 'Юбилей'],
    type: 'souvenir',
  },
  {
    id: '8',
    name: 'Часы настенные из среза агата',
    slug: 'chasy-nastennye-agat',
    price: 320,
    oldPrice: 380,
    images: ['/images/product-8.png', '/images/product-8-2.png'],
    category: 'clocks',
    stone: {
      name: 'Агат',
      properties: 'Полудрагоценный камень с концентрическими слоями. Твёрдость 6.5-7.',
      symbolism: 'Камень стабильности и внутреннего баланса. Укрепляет дух и тело.'
    },
    description: {
      short: ['Диаметр среза ≈ 25 см', 'Натуральный агат', 'Бесшумный механизм', 'Каждый экземпляр уникален'],
      full: 'Настенные часы из натурального среза агата. Каждый срез обладает неповторимым рисунком, созданным природой за миллионы лет.'
    },
    tags: ['для женщины', 'для мужчины', 'интерьер'],
    rating: 4.9,
    reviewCount: 22,
    suitableFor: ['Женщине', 'Мужчине', 'На новоселье'],
    isPopular: true,
    occasion: ['Новоселье', 'Юбилей', 'Свадьба'],
    type: 'decoration',
  },
  {
    id: '9',
    name: 'Подвеска-капля из лунного камня',
    slug: 'podveska-kaplya-lunnyj-kamen',
    price: 120,
    images: ['/images/product-9.png', '/images/product-9-2.png'],
    category: 'jewelry',
    stone: {
      name: 'Лунный камень',
      properties: 'Полупрозрачный камень с голубоватым переливом (адуляресценция). Твёрдость 6-6.5.',
      symbolism: 'Камень интуиции и женской энергии. Приносит удачу в любви и путешествиях.'
    },
    description: {
      short: ['Размер камня 18×12 мм', 'Натуральный лунный камень', 'Оправа серебро 925', 'Цепочка в комплекте'],
      full: 'Элегантная подвеска в форме капли из натурального лунного камня в серебряной оправе. Камень обладает характерным голубоватым сиянием.'
    },
    tags: ['для женщины', 'романтика', 'элегантность'],
    rating: 4.7,
    reviewCount: 28,
    suitableFor: ['Женщине', 'Девушке', 'На годовщину'],
    isNew: true,
    occasion: ['14 февраля', '8 марта', 'День рождения'],
    type: 'jewelry',
  },
  {
    id: '10',
    name: 'Подсвечник из обсидиана',
    slug: 'podsvechnik-obsidian',
    price: 95,
    images: ['/images/product-10.png', '/images/product-10-2.png'],
    category: 'interior',
    stone: {
      name: 'Обсидиан',
      properties: 'Вулканическое стекло чёрного цвета. Твёрдость 5-5.5.',
      symbolism: 'Камень-зеркало. Защищает от негатива и помогает познать себя.'
    },
    description: {
      short: ['Высота 12 см', 'Натуральный обсидиан', 'Для свечи-таблетки', 'Полировка вручную'],
      full: 'Стильный подсвечник из натурального обсидиана. Чёрная зеркальная поверхность камня создаёт эффектную игру света от свечи.'
    },
    tags: ['для женщины', 'для мужчины', 'интерьер', 'доступный'],
    rating: 4.4,
    reviewCount: 19,
    suitableFor: ['Женщине', 'Мужчине', 'Коллеге'],
    occasion: ['Новоселье', 'Без повода', 'День рождения'],
    type: 'decoration',
  },
  {
    id: '11',
    name: 'Набор "Чайная церемония" из серпентина',
    slug: 'nabor-chajnaya-ceremoniya-serpentin',
    price: 380,
    images: ['/images/product-11.png'],
    category: 'souvenirs',
    stone: {
      name: 'Серпентин',
      properties: 'Камень зеленоватых оттенков с шелковистым блеском. Твёрдость 2.5-4.',
      symbolism: 'Камень исцеления и обновления. Защищает от негативных воздействий.'
    },
    description: {
      short: ['Чайник + 4 пиалы', 'Натуральный серпентин', 'Ручная работа', 'Подарочная упаковка'],
      full: 'Изысканный набор для чайной церемонии из натурального серпентина. Включает чайник и 4 пиалы, вырезанные из цельного камня.'
    },
    tags: ['премиум', 'для мужчины', 'для женщины', 'подарочный набор'],
    rating: 4.9,
    reviewCount: 7,
    suitableFor: ['Мужчине', 'Женщине', 'Партнёру', 'Начальнику'],
    occasion: ['Юбилей', 'День рождения', 'Новый год'],
    type: 'souvenir',
  },
  {
    id: '12',
    name: 'Серьги "Капли росы" из хризолита',
    slug: 'sergi-kapli-rosy-hrizolit',
    price: 175,
    oldPrice: 220,
    images: ['/images/product-12.png'],
    category: 'jewelry',
    stone: {
      name: 'Хризолит',
      properties: 'Прозрачный камень зеленовато-золотистого цвета. Твёрдость 6.5-7.',
      symbolism: 'Камень солнца и радости. Привлекает удачу и оберегает от зависти.'
    },
    description: {
      short: ['Длина 3.5 см', 'Натуральный хризолит', 'Золочение 585', 'Фианитовая огранка'],
      full: 'Утончённые серьги с натуральным хризолитом в золотой оправе. Каждый камень имеет классическую огранку, подчёркивающую игру света.'
    },
    tags: ['для женщины', 'элегантность', 'праздник'],
    rating: 4.8,
    reviewCount: 14,
    suitableFor: ['Женщине', 'Девушке', 'На годовщину'],
    isPopular: true,
    occasion: ['8 марта', 'День рождения', '14 февраля'],
    type: 'jewelry',
  },
  {
    id: '13',
    name: 'Глобус из яшмы и офиокальцита',
    slug: 'globus-yashma-ofiokalcit',
    price: 890,
    images: ['/images/product-13.png'],
    category: 'interior',
    stone: {
      name: 'Яшма и офиокальцит',
      properties: 'Комбинация разноцветной яшмы и полупрозрачного офиокальцита.',
      symbolism: 'Символ знаний, путешествий и открытий. Идеальный подарок для руководителя.'
    },
    description: {
      short: ['Высота 35 см', 'Натуральные камни', 'Латунная подставка', 'Эксклюзивное изделие'],
      full: 'Роскошный глобус, изготовленный из натуральной яшмы разных оттенков и полупрозрачного офиокальцита. Латунная подставка с гравировкой.'
    },
    tags: ['премиум', 'для мужчины', 'эксклюзив', 'кабинет'],
    rating: 5.0,
    reviewCount: 4,
    suitableFor: ['Мужчине', 'Начальнику', 'Партнёру'],
    occasion: ['Юбилей', 'Повышение', 'Новый год'],
    type: 'decoration',
  },
  {
    id: '14',
    name: 'Массажные шары из нефрита',
    slug: 'massazhnye-shary-nefrit',
    price: 55,
    images: ['/images/product-14.png'],
    category: 'souvenirs',
    stone: {
      name: 'Нефрит',
      properties: 'Плотный камень зелёного оттенка. Отлично держит и передаёт тепло.',
      symbolism: 'Камень здоровья и долголетия. Снимает напряжение и восстанавливает энергию.'
    },
    description: {
      short: ['Диаметр 4.5 см (пара)', 'Натуральный нефрит', 'В бархатном мешочке', 'Антистресс-эффект'],
      full: 'Классические массажные шары из натурального нефрита для развития мелкой моторики и снятия стресса. Поставляются в бархатном мешочке.'
    },
    tags: ['для мужчины', 'для женщины', 'доступный', 'здоровье'],
    rating: 4.3,
    reviewCount: 36,
    suitableFor: ['Мужчине', 'Женщине', 'Коллеге', 'Другу'],
    occasion: ['Без повода', 'День рождения', '23 февраля'],
    type: 'souvenir',
  },
  {
    id: '15',
    name: 'Ваза "Амфора" из оникса',
    slug: 'vaza-amfora-oniks',
    price: 260,
    images: ['/images/product-15.png'],
    category: 'interior',
    stone: {
      name: 'Оникс',
      properties: 'Полупрозрачный камень медово-коричневых оттенков. Пропускает мягкий свет.',
      symbolism: 'Камень лидеров и ораторов. Укрепляет волю и помогает достигать целей.'
    },
    description: {
      short: ['Высота 25 см', 'Натуральный оникс', 'Выточена из цельного камня', 'Пропускает свет'],
      full: 'Изящная ваза в форме амфоры, выточенная из цельного куска натурального оникса. При подсветке камень светится изнутри тёплым медовым светом.'
    },
    tags: ['для женщины', 'интерьер', 'премиум'],
    rating: 4.6,
    reviewCount: 11,
    suitableFor: ['Женщине', 'На новоселье', 'Маме'],
    isPopular: true,
    occasion: ['Новоселье', 'Юбилей', '8 марта'],
    type: 'decoration',
  },
  {
    id: '16',
    name: 'Кольцо-печатка из лазурита',
    slug: 'kolco-pechatka-lazurit',
    price: 145,
    images: ['/images/product-16.png'],
    category: 'jewelry',
    stone: {
      name: 'Лазурит',
      properties: 'Непрозрачный камень насыщенного синего цвета с вкраплениями пирита. Твёрдость 5-6.',
      symbolism: 'Камень истины и мудрости. Издревле считался символом власти и достоинства.'
    },
    description: {
      short: ['Размеры 17-21', 'Натуральный лазурит', 'Оправа из латуни', 'Полировка кабошон'],
      full: 'Кольцо-печатка с натуральным лазуритом в латунной оправе. Камень обработан в форме кабошона, подчёркивающей глубокий синий цвет.'
    },
    tags: ['для мужчины', 'стиль', 'классика'],
    rating: 4.5,
    reviewCount: 17,
    suitableFor: ['Мужчине', 'Партнёру', 'Другу'],
    isNew: true,
    occasion: ['День рождения', '23 февраля', 'Без повода'],
    type: 'jewelry',
  },
  {
    id: '17',
    name: 'Картина "Цветущая сакура" из коралла',
    slug: 'kartina-sakura-korall',
    price: 470,
    images: ['/images/product-17.png'],
    category: 'paintings',
    stone: {
      name: 'Коралл и перламутр',
      properties: 'Органические камни с нежной розовой и белой палитрой.',
      symbolism: 'Коралл — камень путешественников, перламутр — символ чистоты и невинности.'
    },
    description: {
      short: ['Размер 40×50 см', 'Натуральный коралл и перламутр', 'Ручная аппликация', 'Антибликовое стекло'],
      full: 'Картина в японском стиле, созданная из кусочков натурального коралла и перламутра. Цветы сакуры объёмны и переливаются перламутровым блеском.'
    },
    tags: ['для женщины', 'премиум', 'интерьер', 'арт'],
    rating: 4.9,
    reviewCount: 9,
    suitableFor: ['Женщине', 'Маме', 'На годовщину'],
    occasion: ['8 марта', 'День рождения', 'Юбилей'],
    type: 'decoration',
  },
  {
    id: '18',
    name: 'Пирамида из шунгита',
    slug: 'piramida-shungit',
    price: 40,
    images: ['/images/product-18.png'],
    category: 'souvenirs',
    stone: {
      name: 'Шунгит',
      properties: 'Древний минерал чёрного цвета, содержит фуллерены. Уникальные очищающие свойства.',
      symbolism: 'Камень-щит. Нейтрализует электромагнитное излучение и очищает пространство.'
    },
    description: {
      short: ['Высота 5 см', 'Натуральный карельский шунгит', 'Полированная', 'Защита от ЭМИ'],
      full: 'Полированная пирамида из натурального карельского шунгита. Рекомендуется ставить рядом с компьютером или телевизором.'
    },
    tags: ['доступный', 'для мужчины', 'для женщины', 'здоровье'],
    rating: 4.2,
    reviewCount: 53,
    suitableFor: ['Мужчине', 'Женщине', 'Коллеге', 'Другу'],
    occasion: ['Без повода', 'День рождения', 'Новый год'],
    type: 'souvenir',
  },
  {
    id: '19',
    name: 'Набор подставок для бокалов из агата',
    slug: 'podstavki-bokalov-agat',
    price: 135,
    oldPrice: 165,
    images: ['/images/product-19.png'],
    category: 'interior',
    stone: {
      name: 'Агат',
      properties: 'Срезы агата с золотым напылением по краям. Каждый срез уникален.',
      symbolism: 'Камень внутренней гармонии и стабильности.'
    },
    description: {
      short: ['4 подставки в наборе', 'Натуральный агат', 'Золотое напыление', 'Подарочная коробка'],
      full: 'Набор из 4 подставок для бокалов из натурального среза агата с золотым напылением по краям. Каждая подставка уникальна.'
    },
    tags: ['для женщины', 'для мужчины', 'интерьер', 'подарочный набор'],
    rating: 4.7,
    reviewCount: 25,
    suitableFor: ['Женщине', 'Мужчине', 'На новоселье', 'Паре'],
    isPopular: true,
    occasion: ['Новоселье', 'Свадьба', 'Новый год'],
    type: 'decoration',
  },
  {
    id: '20',
    name: 'Запонки из тигрового глаза',
    slug: 'zaponki-tigrovyj-glaz',
    price: 98,
    images: ['/images/product-20.png'],
    category: 'jewelry',
    stone: {
      name: 'Тигровый глаз',
      properties: 'Камень с шелковистым переливом золотисто-коричневых оттенков.',
      symbolism: 'Камень деловых людей. Помогает в переговорах и принятии решений.'
    },
    description: {
      short: ['Натуральный тигровый глаз', 'Основа из латуни', 'Огранка кабошон', 'В бархатном футляре'],
      full: 'Элегантные запонки с натуральным тигровым глазом. Камни обработаны в форме кабошона, подчёркивающей природный перелив.'
    },
    tags: ['для мужчины', 'деловой стиль', 'аксессуары'],
    rating: 4.6,
    reviewCount: 13,
    suitableFor: ['Мужчине', 'Партнёру', 'Начальнику'],
    isNew: true,
    occasion: ['23 февраля', 'День рождения', 'Повышение'],
    type: 'jewelry',
  },
];

export const reviews: Review[] = [
  {
    id: '1',
    author: 'Марина К.',
    rating: 5,
    text: 'Заказала картину из яшмы в подарок маме на юбилей. Мама была в восторге! Качество потрясающее, каждый камешек подобран идеально. Доставили аккуратно, в красивой упаковке.',
    date: '2024-12-15',
    productName: 'Картина "Горный пейзаж"',
  },
  {
    id: '2',
    author: 'Алексей В.',
    rating: 5,
    text: 'Купил часы из малахита для своего кабинета. Смотрятся роскошно! Механизм работает отлично, а рисунок камня просто завораживает. Однозначно рекомендую.',
    date: '2024-11-28',
    productName: 'Часы настольные из малахита',
  },
  {
    id: '3',
    author: 'Елена Д.',
    rating: 4,
    text: 'Бусы из розового кварца — просто мечта! Нежные, красивые, хорошо сочетаются с любым нарядом. Единственное — хотелось бы цепочку чуть длиннее.',
    date: '2025-01-10',
    productName: 'Бусы из розового кварца',
  },
  {
    id: '4',
    author: 'Дмитрий С.',
    rating: 5,
    text: 'Подарил жене панно "Дерево жизни" на 8 марта. Она сказала, что это лучший подарок в её жизни! Камни переливаются на свету потрясающе.',
    date: '2025-03-10',
    productName: 'Панно "Дерево жизни"',
  },
  {
    id: '5',
    author: 'Ольга М.',
    rating: 5,
    text: 'Шкатулка из оникса — произведение искусства! Использую для хранения украшений. Бархатная подкладка внутри — приятный бонус. Спасибо за качественную работу!',
    date: '2025-02-20',
    productName: 'Шкатулка из оникса',
  },
  {
    id: '6',
    author: 'Игорь Н.',
    rating: 5,
    text: 'Заказывал глобус из камня для директора. Впечатление произвёл невероятное! Теперь все коллеги приходят им полюбоваться. Качество на высшем уровне.',
    date: '2024-12-25',
    productName: 'Глобус из яшмы',
  },
];

export const stones = [
  'Яшма', 'Малахит', 'Розовый кварц', 'Оникс', 'Аметист',
  'Тигровый глаз', 'Нефрит', 'Агат', 'Лунный камень', 'Обсидиан',
  'Серпентин', 'Хризолит', 'Лазурит', 'Коралл', 'Шунгит',
];

export const occasions = [
  'День рождения', 'Юбилей', '8 марта', '23 февраля', '14 февраля',
  'Новый год', 'Новоселье', 'Свадьба', 'Без повода',
];

export const recipients = [
  'Женщине', 'Мужчине', 'Маме', 'Девушке', 'Другу',
  'Коллеге', 'Начальнику', 'Партнёру',
];

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.category === categorySlug);
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getPopularProducts(): Product[] {
  return products.filter(p => p.isPopular);
}

export function getNewProducts(): Product[] {
  return products.filter(p => p.isNew);
}

export function searchProducts(filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  stone?: string;
  tag?: string;
  occasion?: string;
  suitableFor?: string;
  type?: string;
  sort?: 'popular' | 'new' | 'price-asc' | 'price-desc';
}): Product[] {
  let result = [...products];

  if (filters.category) result = result.filter(p => p.category === filters.category);
  if (filters.minPrice) result = result.filter(p => p.price >= filters.minPrice!);
  if (filters.maxPrice) result = result.filter(p => p.price <= filters.maxPrice!);
  if (filters.stone) result = result.filter(p => p.stone.name.toLowerCase().includes(filters.stone!.toLowerCase()));
  if (filters.tag) result = result.filter(p => p.tags.includes(filters.tag!));
  if (filters.occasion) result = result.filter(p => p.occasion?.includes(filters.occasion!));
  if (filters.suitableFor) result = result.filter(p => p.suitableFor.includes(filters.suitableFor!));
  if (filters.type) result = result.filter(p => p.type === filters.type);

  switch (filters.sort) {
    case 'popular':
      result.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case 'new':
      result = result.filter(p => p.isNew).concat(result.filter(p => !p.isNew));
      break;
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
  }

  return result;
}
