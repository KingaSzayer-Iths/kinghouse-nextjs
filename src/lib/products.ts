import type { Product } from "@/types/Product";
import productsData from "@/data/products.json";

// Hämtar alla produkter från den lokala JSON-filen
export async function getProducts(): Promise<Product[]> {
    return productsData.products as Product[];
}








