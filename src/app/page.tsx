import Link from "next/link";
import styles from "./page.module.css";
import { getProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard/ProductCard";


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

          {/* För varje utvald produkt renderas ett ProductCard.
              De första fyra bilderna ligger i första raden på desktop
              och någon av dem kan därför bli sidans LCP. */}
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              // Någon av dem första fyra bilderna kan bli sidans LCP, därför laddas de direkt.
              priority={index < 4}
            />
          ))}

        </div>
      </section>

      {/* Kategorier */}
      <section className={styles.categories}>
        <h2>Utforska våra kategorier</h2>

        <div className={styles.categoryGrid}>
          <article className={styles.categoryCard}>
            <h3>Ljusstakar</h3>
            <p className={styles.categoryDescription}>
              Stilrena former och tidlös design för hemmets alla rum.
            </p>
            <Link href="/products" className={styles.categoryLink}>
              Visa ljusstakar
            </Link>
          </article>

          <article className={styles.categoryCard}>
            <h3>Doftljus</h3>
            <p className={styles.categoryDescription}>
              Noggrant utvalda dofter för en varm och harmonisk atmosfär.
            </p>
            <Link href="/products" className={styles.categoryLink}>
              Visa doftljus
            </Link>
          </article>
        </div>

      </section>
    </main>
  );
}