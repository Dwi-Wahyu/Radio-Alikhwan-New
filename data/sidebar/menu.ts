export interface MenuItem {
  title: string;
  icon?: string;
  icon2?: string;
  route: string;
  child?: any;
  roles: any;
  type: string;
}

export const menuItems: MenuItem[] = [
  {
    title: "Artikel",
    icon: "iconamoon:news-fill",
    icon2: "iconamoon:news-light",
    route: "/artikel",
    child: [],
    roles: [],
    type: "parent",
  },
  {
    title: "Galeri",
    icon: "clarity:image-gallery-solid",
    icon2: "clarity:image-gallery-line",
    route: "/galeri",
    child: [],
    roles: [],
    type: "parent",
  },
  {
    title: "Program Acara",
    icon: "ix:scheduler-filled",
    icon2: "ix:scheduler",
    route: "/program-acara",
    child: [],
    roles: [],
    type: "parent",
  },
  {
    title: "Tentang Kami",
    icon: "ix:about-filled",
    icon2: "ix:about",
    route: "/tentang-kami",
    child: [
      {
        title: "Kata Sambutan",
        route: "/tentang-kami/kata-sambutan",
      },
      {
        title: "Statistik",
        route: "/tentang-kami/statistik",
      },
    ],
    roles: [],
    type: "parent",
  },
  {
    title: "Struktur",
    icon: "fluent:people-team-20-filled",
    icon2: "fluent:people-team-16-regular",
    route: "/struktur",
    child: [],
    roles: [],
    type: "parent",
  },
];
