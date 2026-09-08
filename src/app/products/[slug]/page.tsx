import type { Product } from "@/types/Product";


interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
// Hämtar produkten som matchar slug från URL:en
const response = await fetch(
  `http://localhost:3001/products?slug=${slug}`
);

const products: Product[] = await response.json();
// Hämtar den första matchande produkten i arrayen
const product = products[0];

  return (
    <main id="main-content">
        <h1>{product?.name}</h1>
    </main>
  );
}