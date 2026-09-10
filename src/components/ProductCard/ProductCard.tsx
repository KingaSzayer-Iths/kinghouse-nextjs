import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/Product";
import styles from "./ProductCard.module.css";
import FavoriteIconButton from "@/components/FavoriteIconButton/FavoriteIconButton";


interface ProductCardProps {
    product: Product;
}

// ProductCard tar emot props som ska följa ProductCardProps och ur dessa props plockar man direkt ut product.
export default function ProductCard({ product }: ProductCardProps) {
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
