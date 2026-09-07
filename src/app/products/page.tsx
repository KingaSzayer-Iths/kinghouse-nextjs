import ProductCard from "@/components/ProductCard/ProductCard";
import { getProducts } from "@/lib/products";
import styles from "./page.module.css";

export default async function ProductsPage() {
  // Hämtar alla produkter från mock-API
  const products = await getProducts();  
  return (
  <main id="main-content" className={styles.productsPage}>
    <h1 className={styles.title}>Produkter</h1>
    
      <div className={styles.productGrid}>
        {/* Hela sortimentet ska visas */}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}