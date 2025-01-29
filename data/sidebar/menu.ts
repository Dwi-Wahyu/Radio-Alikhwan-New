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
    icon: "artikel-active",
    icon2: "artikel-inactive",
    route: "/artikel",
    child: [],
    roles: [],
    type: "parent",
  },
  {
    title: "Galeri",
    icon: "galeri-active",
    icon2: "galeri-inactive",
    route: "/galeri",
    child: [],
    roles: [],
    type: "parent",
  },
  {
    title: "Program Acara",
    icon: "program-acara-active",
    icon2: "program-acara-inactive",
    route: "/program-acara",
    child: [],
    roles: [],
    type: "parent",
  },
  {
    title: "Tentang Kami",
    icon: "tentang-kami-active",
    icon2: "tentang-kami-inactive",
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
    icon: "struktur-active",
    icon2: "struktur-inactive",
    route: "/struktur",
    child: [],
    roles: [],
    type: "parent",
  },
  {
    title: "Komentar",
    icon: "komentar-active",
    icon2: "komentar-inactive",
    route: "/komentar",
    child: [],
    roles: [],
    type: "parent",
  },
];
