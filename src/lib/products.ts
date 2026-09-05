import type { Product } from "@/types/Product";

// Hämtar alla produkter från vårt mock-API
export async function getProducts(): Promise<Product[]> {
  const response = await fetch("http://localhost:3001/products");

  const products: Product[] = await response.json();

  return products;
}