import type { Product } from "@/types/Product";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";


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

    // Om ingen produkt hittas blir product undefined och notFound() visar 404-sidan
    if (!product) {
        notFound();
    }


    return (
        <main id="main-content" className={styles.productPage}>
            <Link href="/products" className={styles.backLink}>
                ← Tillbaka till produkter
            </Link>
            <div className={styles.productDetails}>
                {/* Produktbild och produktinformation */}
                <Image className={styles.productImage}
                    src={product.image}
                    alt={product.alt}
                    width={600}
                    height={600}
                />
                <div className={styles.productInfo}>
                    <h1 className={styles.productName}>{product.name}</h1>
                    <p className={styles.productPrice}>{product.price} kr</p>
                    <p className={styles.productDescription}>{product.description}</p>
                    <div className={styles.productMeta}>
                        <p><strong>Material:</strong> {product.material}</p>
                        <p><strong>Färg:</strong> {product.color}</p>
                        {product.scent && (
                            <p><strong>Doft:</strong> {product.scent}</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
