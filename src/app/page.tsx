import Link from "next/link";
import styles from "./page.module.css";
import { getProducts } from "@/lib/products";


export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.filter((product) => product.featured);
  return (
    <main id="main-content">
      {/* Hero-sektion */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Skandinavisk design för ditt hem
        </h1>
        <p className={styles.heroDescription}>
          Upptäck ett kuraterat sortiment av ljusstakar och doftljus
          med fokus på stilren och tidlös design.
        </p>

        <Link href="/products" className={styles.heroCta}>
          Utforska sortimentet
        </Link>
      </section>

      {/* Utvalda produkter */}
      <section className={styles.featured}>
        <h2 className={styles.sectionTitle}>Utvalda produkter</h2>
        <div className={styles.productGrid}>
          {featuredProducts.map((product) => (
            <article key={product.id} className={styles.productCard}>
              <h3>{product.name}</h3>
            </article>
          ))}
        </div>
      </section>

      {/* Kategorier */}
      <section>
        <h2>Utforska våra kategorier</h2>
      </section>
    </main>
  );
}