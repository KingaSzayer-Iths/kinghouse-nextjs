export interface Product {
  id: string;
  slug: string;
  name: string;
  category: "candlestick" | "scented-candle";
  price: number;
  description: string;
  material: string;
  color: string;
  image: string;
  alt: string;
  featured: boolean;
  scent?: string; // Behövs bara för doftljus och är därför optional
}