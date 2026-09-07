import ProductCard from "@/components/ProductCard/ProductCard";
import { getProducts } from "@/lib/products";

export default async function ProductsPage() {
  // Hämtar alla produkter från mock-API
  const products = await getProducts();  
  return (
    <main id="main-content">
      <h1>Produkter</h1>
      <div className="productGrid">
        {/* Hela sortimentet ska visas */}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}