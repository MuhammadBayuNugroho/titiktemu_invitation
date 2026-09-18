import type { TemplateConfig } from "@/types/invitation";

export const TEMPLATES: Record<string, TemplateConfig> = {
  elegant: {
    id: "tpl-elegant",
    slug: "elegant",
    name: "01 Elegant",
    description: "Desain anggun dengan tipografi serif klasik, palet warna krem & emas hangat, cocok untuk resepsi pernikahan sakral dan megah.",
    colors: {
      primary: "#8a6d3b",
      secondary: "#c5a059",
      background: "#fdfbf7",
      foreground: "#2b2623",
      accent: "#f4ede2",
    },
    typography: {
      heading: "serif",
      body: "sans",
    },
    sections: [
      "cover",
      "opening",
      "couple",
      "event",
      "countdown",
      "location",
      "story",
      "gallery",
      "gift",
      "rsvp",
      "guestbook",
      "closing",
    ],
    animationStyle: "fade-up",
    ornamentStyle: "floral-gold",
  },
  minimalist: {
    id: "tpl-minimalist",
    slug: "minimalist",
    name: "02 Minimalist",
    description: "Desain kontemporer bersih dengan tipografi sans-serif modern, tata letak luas, nuansa monokromatik abu-abu halus dan hitam pekat.",
    colors: {
      primary: "#18181b",
      secondary: "#71717a",
      background: "#ffffff",
      foreground: "#09090b",
      accent: "#f4f4f5",
    },
    typography: {
      heading: "sans",
      body: "sans",
    },
    sections: [
      "cover",
      "opening",
      "couple",
      "event",
      "countdown",
      "location",
      "story",
      "gallery",
      "gift",
      "rsvp",
      "guestbook",
      "closing",
    ],
    animationStyle: "slide",
    ornamentStyle: "geometric",
  },
  nusantara: {
    id: "tpl-nusantara",
    slug: "nusantara",
    name: "03 Nusantara",
    description: "Desain berbalut kekayaan budaya Nusantara dengan ornamen motif tradisional bernuansa terakota, cokelat kayu, dan aksen etnik modern.",
    colors: {
      primary: "#7c2d12",
      secondary: "#b45309",
      background: "#fcfaf7",
      foreground: "#291b12",
      accent: "#fef3c7",
    },
    typography: {
      heading: "serif",
      body: "sans",
    },
    sections: [
      "cover",
      "opening",
      "couple",
      "event",
      "countdown",
      "location",
      "story",
      "gallery",
      "gift",
      "rsvp",
      "guestbook",
      "closing",
    ],
    animationStyle: "smooth",
    ornamentStyle: "batik-accent",
  },
};

export function getTemplateConfig(slug: string): TemplateConfig {
  return TEMPLATES[slug] || TEMPLATES.elegant;
}

export function getAllTemplates(): TemplateConfig[] {
  return Object.values(TEMPLATES);
}
