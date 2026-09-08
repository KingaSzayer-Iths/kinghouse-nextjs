import type { Product } from "@/types/Product";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";


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

    // Om ingen produkt hittas, visa 404-sidan
    if (!product) {
        notFound();
    }


    return (
        <main id="main-content">
            <Link href="/products">
                ← Tillbaka till produkter
            </Link>
            <Image
                src={product.image}
                alt={product.alt}
                width={600}
                height={600}
            />
            <h1>{product.name}</h1>
            <p>{product.price} kr</p>
            <p>{product.description}</p>
            <p><strong>Material:</strong> {product.material}</p>
            <p><strong>Färg:</strong> {product.color}</p>
            {product.scent && (
                <p><strong>Doft:</strong> {product.scent}</p>
            )}

        </main>
    );
}