import { getProducts } from "@/lib/products";
import styles from "./page.module.css";
import ProductList from "@/components/ProductList/ProductList";

export default async function ProductsPage() {
  // Hämtar alla produkter från mock-API
  const products = await getProducts();  
  return (
  <main id="main-content" className={styles.productsPage}>
    <h1 className={styles.title}>Produkter</h1>
    
  {/* Skickar produktdata till ProductList som visar produkterna */}  
    <ProductList products={products} />
    

{/* tar bort den delen: Och eftersom ProductCard då inte längre används direkt i page.tsx */}
      {/* <div className={styles.productGrid}> */}
        {/* Hela sortimentet ska visas */}
        {/* {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div> */}
    </main>
  );
}