export const PRODUCT_CATEGORIES = [
  {
    label: "UI Kits",
    value: "ui_kits" as const,
    featured: [
      {
        name: "Editor picks",
        href: `/products?category=ui_kits`,
        imageSrc: "/nav/ui-kits/mixed.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products?category=ui_kits&sort=desc",
        imageSrc: "/nav/ui-kits/blue.jpg",
      },
      {
        name: "Bestsellers",
        href: "/products?category=ui_kits",
        imageSrc: "/nav/ui-kits/purple.jpg",
      },
    ],
  },
  {
    label: "Icons",
    value: "icons" as const,
    featured: [
      {
        name: "Favorite Icon Picks",
        href: `/products?category=icons`,
        imageSrc: "/nav/icons/picks.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products?category=icons&sort=desc",
        imageSrc: "/nav/icons/new.jpg",
      },
      {
        name: "Bestselling Icons",
        href: "/products?category=icons",
        imageSrc: "/nav/icons/bestsellers.jpg",
      },
    ],
  },
  {
    label: "Themes",
    value: "themes" as const,
    featured: [
      {
        name: "Editor picks",
        href: `/products?category=ui_kits`,
        imageSrc: "/nav/ui-kits/mixed.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products?category=ui_kits&sort=desc",
        imageSrc: "/nav/ui-kits/blue.jpg",
      },
      {
        name: "Bestsellers",
        href: "/products?category=ui_kits",
        imageSrc: "/nav/ui-kits/purple.jpg",
      },
    ],
  },
  {
    label: "3D Models",
    value: "3d_models" as const,
    featured: [
      {
        name: "Editor picks",
        href: `/products?category=3d_models`,
        imageSrc: "/nav/3dmodels/models.avif",
      },
      {
        name: "New Arrivals",
        href: "/products?category=3d_models&sort=desc",
        imageSrc: "/nav/3dmodels/character.jpeg",
      },
      {
        name: "Bestsellers",
        href: "/products?category=3d_models",
        imageSrc: "/nav/3dmodels/3dmodel.jpeg",
      },
    ],
  },
];
