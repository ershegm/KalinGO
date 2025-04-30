
interface Route {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
  category: string;
  rating: number;
  reviewCount: number;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  count: number;
}

export const allRoutes: Route[] = [
  {
    id: 1,
    title: "Исторический центр Калининграда",
    description: "Маршрут по историческому центру с посещением главных достопримечательностей бывшего Кёнигсберга.",
    image: "https://cf.youtravel.me/tr:w-1500/upload/tours/16056/media/ea9/ea98210fcb26c5edf109c9b0592ab85f.jpg",
    duration: "180 минут",
    category: "historical",
    rating: 4.8,
    reviewCount: 124
  },
  {
    id: 2,
    title: "Рыбная деревня и остров Канта",
    description: "Прогулка по Рыбной деревне и острову Канта с посещением Кафедрального собора.",
    image: "https://ic.pics.livejournal.com/piskunov_vitaly/70476120/693987/693987_900.jpg",
    duration: "120 минут",
    category: "cultural",
    rating: 4.6,
    reviewCount: 98
  },
  {
    id: 3,
    title: "Форты и оборонительные сооружения",
    description: "Маршрут по фортификационным сооружениям города, входившим в систему обороны Кёнигсберга.",
    image: "https://travel-mania.org/uploads/Blog/Kalinin/kalin-3-min.jpg",
    duration: "240 минут",
    category: "historical",
    rating: 4.5,
    reviewCount: 76
  },
  {
    id: 4,
    title: "Парки и скверы Калининграда",
    description: "Зелёный маршрут по самым красивым паркам и скверам города.",
    image: "https://omega-rent39.ru/wp-content/uploads/2021/10/parkiyshnii35.jpeg",
    duration: "150 минут",
    category: "nature",
    rating: 4.3,
    reviewCount: 62
  },
  {
    id: 5,
    title: "Гастрономический тур: кёнигсбергские клопсы",
    description: "Путешествие по лучшим ресторанам города с традиционной кухней Восточной Пруссии.",
    image: "https://icdn.bolshayastrana.com/1200x00/2d/cb/2dcbb6148e70513c4bddd99dd1dd084e.jpeg",
    duration: "180 минут",
    category: "gastronomy",
    rating: 4.7,
    reviewCount: 87
  },
  {
    id: 6,
    title: "По следам Иммануила Канта",
    description: "Маршрут по местам, связанным с жизнью и деятельностью великого философа.",
    image: "https://img.gazeta.ru/files3/644/18975644/RIA_1292628-pic_32ratio_900x600-900x600-11965.jpg",
    duration: "120 минут",
    category: "cultural",
    rating: 4.4,
    reviewCount: 53
  },
  {
    id: 7,
    title: "Морское наследие Калининграда",
    description: "Маршрут по морским достопримечательностям города, включая Музей Мирового океана.",
    image: "https://avatars.mds.yandex.net/i?id=05bd26c7483dcc30f563e9d891c2e3fe_l-5500026-images-thumbs&n=13",
    duration: "210 минут",
    category: "cultural",
    rating: 4.6,
    reviewCount: 71
  },
  {
    id: 8,
    title: "Прогулка по Амалиенау",
    description: "Маршрут по историческому району города с уникальной архитектурой начала XX века.",
    image: "https://avatars.mds.yandex.net/i?id=e30fdf56031abf9ce126611ef43fb78c3a56c70d-10576051-images-thumbs&n=13",
    duration: "90 минут",
    category: "historical",
    rating: 4.5,
    reviewCount: 48
  },
  {
    id: 9,
    title: "Янтарный путь",
    description: "Маршрут, посвященный главному символу Калининградской области - янтарю.",
    image: "https://wikiway.com/upload/iblock/ebf/caption-_26_.jpg",
    duration: "150 минут",
    category: "cultural",
    rating: 4.7,
    reviewCount: 68
  },
  {
    id: 10,
    title: "Калининград литературный",
    description: "Маршрут по местам, связанным с известными писателями и поэтами.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/9213367/pub_649c42a7495c981133d69a1b_649c5cae9d30ed151237ba3c/scale_1200",
    duration: "120 минут",
    category: "cultural",
    rating: 4.2,
    reviewCount: 37
  },
  {
    id: 11,
    title: "Зеленое кольцо Калининграда",
    description: "Маршрут по зеленым зонам вокруг исторического центра города.",
    image: "https://avatars.mds.yandex.net/get-altay/367090/2a000001630eb517b7710e4c86e460d1cd9a/XXXL",
    duration: "180 минут",
    category: "nature",
    rating: 4.4,
    reviewCount: 42
  },
  {
    id: 12,
    title: "Вкусный Калининград",
    description: "Гастрономическое путешествие по лучшим кафе и ресторанам города.",
    image: "https://avatars.mds.yandex.net/get-altay/1886165/2a0000016cba3e88b29d52fc4b75e5ce2afa/XXL",
    duration: "210 минут",
    category: "gastronomy",
    rating: 4.8,
    reviewCount: 93
  }
];

export const featuredRoutes = allRoutes.slice(0, 3);

export const categories: Category[] = [
  {
    id: 1,
    name: "Исторические",
    slug: "historical",
    image: "https://cs14.pikabu.ru/post_img/2023/09/23/7/og_og_1695466871252998121.jpg",
    count: allRoutes.filter(route => route.category === "historical").length
  },
  {
    id: 2,
    name: "Культурные",
    slug: "cultural",
    image: "https://avatars.mds.yandex.net/i?id=65b19c218017fe1267fecc09e076f366_l-10782253-images-thumbs&n=13",
    count: allRoutes.filter(route => route.category === "cultural").length
  },
  {
    id: 3,
    name: "Природные",
    slug: "nature",
    image: "https://zemteacher.apkpro.ru/uploads/files/file63dcd7a10613a2.76858968.jpeg",
    count: allRoutes.filter(route => route.category === "nature").length
  },
  {
    id: 4,
    name: "Гастрономические",
    slug: "gastronomy",
    image: "https://cdn.tripster.ru/thumbs2/3cc87864-a8d3-11eb-b0b7-06cfed260005.800x600.jpg",
    count: allRoutes.filter(route => route.category === "gastronomy").length
  }
];