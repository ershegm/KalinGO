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

export const categories: Category[] = [
  {
    id: 1,
    name: "Исторические",
    slug: "historical",
    image:
      "https://cs14.pikabu.ru/post_img/2023/09/23/7/og_og_1695466871252998121.jpg",
    count: 0,
  },
  {
    id: 2,
    name: "Культурные",
    slug: "cultural",
    image:
      "https://avatars.mds.yandex.net/i?id=65b19c218017fe1267fecc09e076f366_l-10782253-images-thumbs&n=13",
    count: 0,
  },
  {
    id: 3,
    name: "Природные",
    slug: "nature",
    image:
      "https://zemteacher.apkpro.ru/uploads/files/file63dcd7a10613a2.76858968.jpeg",
    count: 0,
  },
  {
    id: 4,
    name: "Гастрономические",
    slug: "gastronomy",
    image:
      "https://cdn.tripster.ru/thumbs2/3cc87864-a8d3-11eb-b0b7-06cfed260005.800x600.jpg",
    count: 0,
  },
];
