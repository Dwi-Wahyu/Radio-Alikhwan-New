export const navMenu = [
  {
    label: "Home",
    type: "link",
    path: "#home",
  },
  {
    label: "Artikel",
    type: "link",
    path: "#artikel",
  },
  {
    label: "Tentang Kami",
    type: "dropdown",
    path: "/",
    submenu: [
      {
        label: "Kata Sambutan",
        link: "#kata-sambutan",
      },
      {
        label: "Profil Radio",
        link: "#profil-radio",
      },
      {
        label: "Biaya Iklan",
        link: "/iklan/tarif-iklan.png",
        target: "_blank",
      },
      {
        label: "Profil Pendengar",
        link: "#profil-pendengar",
      },
    ],
  },
  {
    label: "Program Acara",
    type: "link",
    path: "#program-acara",
  },
  {
    label: "Struktur",
    type: "link",
    path: "#struktur",
  },
  {
    label: "Galeri",
    type: "link",
    path: "#galeri",
  },
];
