import type { Product } from "@/types/Product";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import productsData from "@/data/products.json";

interface ProductPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;

    // Läser produktinformationen från den lokala JSON-filen
    const products = productsData.products as Product[];

    // Hämtar produkten som matchar slug från URL:en
    const product = products.find(
        (product) => product.slug === slug
    );

    // Om ingen produkt hittas blir product undefined
    // och notFound() visar 404-sidan
    if (!product) {
        notFound();
    }

    return (
        <main
            id="main-content"
            className={styles.productPage}
        >
            <Link
                href="/products"
                className={styles.backLink}
            >
                ← Tillbaka till produkter
            </Link>

            <div className={styles.productDetails}>
                {/* Produktbild och produktinformation */}
                <Image
                    className={styles.productImage}
                    src={product.image}
                    alt={product.alt}
                    width={600}
                    height={600}
                    // Hjälper Next.js att välja rätt bildstorlek utifrån layouten.
                    // På mobil använder bilden hela kolumnen och på större skärmar ungefär halva bredden.
                    sizes="(max-width: 47.99rem) 100vw, 50vw"
                />

                <div className={styles.productInfo}>
                    <h1 className={styles.productName}>
                        {product.name}
                    </h1>

                    <p className={styles.productPrice}>
                        {product.price} kr
                    </p>

                    <AddToCartButton productId={product.id} />

                    <p className={styles.productDescription}>
                        {product.description}
                    </p>

                    <div className={styles.productMeta}>
                        <FavoriteButton productId={product.id} />

                        <p>
                            <strong>Material:</strong>{" "}
                            {product.material}
                        </p>

                        <p>
                            <strong>Färg:</strong>{" "}
                            {product.color}
                        </p>

                        {product.scent && (
                            <p>
                                <strong>Doft:</strong>{" "}
                                {product.scent}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}