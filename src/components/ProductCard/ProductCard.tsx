import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/Product";
import styles from "./ProductCard.module.css";
import FavoriteIconButton from "@/components/FavoriteIconButton/FavoriteIconButton";


interface ProductCardProps {
    product: Product;
    // Anger om produktbilden ska prioriteras vid inladdning.
    // Används för bilder som visas direkt på sidan och kan påverka LCP (Largest Contentful Paint).
    priority?: boolean;
}

// ProductCard tar emot props som ska följa ProductCardProps och ur dessa props plockar man direkt ut product.
export default function ProductCard({ product, priority = false }: ProductCardProps) {
    return (
        <article className={styles.productCard}>

            {/* Renderar FavoriteIconButton-komponenten och skickar med product.id som prop */}
            <FavoriteIconButton productId={product.id} />

            {/* ${product.slug} byts ut mot den aktuella (värdet) produktens slug /template literal */}
            <Link href={`/products/${product.slug}`}>
                <div className={styles.imageWrapper}>
                    <Image
                        className={styles.productImage}
                        src={product.image}
                        alt={product.alt}
                        width={500}
                        height={500}
                        // Hjälper Next.js att välja en lagom stor bild beroende på skärmstorlek
                        // och hur många kolumner produktgridden visar.
                        sizes="(max-width: 47.99rem) 100vw, (max-width: 63.99rem) 50vw, 25vw"
                        // Den första synliga produktbilden laddas direkt eftersom den kan bli sidans LCP.
                        // Övriga bilder använder Next.js vanliga lazy loading.
                        loading={priority ? "eager" : undefined}
                    />
                </div>

                <div className={styles.productInfo}>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <p className={styles.productPrice}>{product.price} kr</p>
                </div>
            </Link>

        </article>
    );
}
