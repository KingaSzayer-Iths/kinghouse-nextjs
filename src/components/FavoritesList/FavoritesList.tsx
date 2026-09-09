"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/Product";
import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./FavoritesList.module.css";
import Link from "next/link";



export default function FavoritesList() {
    // State-variabel som håller reda på vilka produkter som är favoriter ["1", "5"]
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
    // State-variabel som innehåller de fullständiga favoritprodukterna, hela produktobjekten för produkt 1 och 5
    const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

    // Hämtar sparade favorit-id:n från localStorage
    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        // Om det finns sparade favoriter, gör om JSON-texten till en array och spara i state
        if (storedFavorites) {
            const favorites: string[] = JSON.parse(storedFavorites);
            setFavoriteIds(favorites);
        }
        // Om det inte finns några sparade favoriter, sätt favoriteIds till en tom array
    }, []);

    // Hämtar alla produkter från mock-API
    useEffect(() => {
        async function fetchProducts() {
            const response = await fetch("http://localhost:3001/products");
            const products: Product[] = await response.json();

            // Filtrerar fram de produkter vars id finns bland sparade favoriter
            const favorites = products.filter((product) =>
                favoriteIds.includes(product.id)
            );
            // Sparar de fullständiga favoritprodukterna i state
            setFavoriteProducts(favorites);
        }
        // Anropar funktionen för att hämta produkter när favoriteIds ändras
        fetchProducts();
        // Om favoriteIds ändras, körs useEffect igen och hämtar uppdaterade favoritprodukter
    }, [favoriteIds]);

    // Tar bort en produkt från favoriter
    function removeFavorite(productId: string) {
        const updatedFavoriteIds = favoriteIds.filter(
            (id) => id !== productId
        );

        localStorage.setItem(
            "favorites",
            JSON.stringify(updatedFavoriteIds)
        );
        // Uppdaterar state med den nya listan av favorit-id:n
        setFavoriteIds(updatedFavoriteIds);
    }

    // Om arrayen är tom, true - istället för en tom produktgrid så visar ett meddelande inga sparade favoriter
    if (favoriteProducts.length === 0) {
        return (
            <div className={styles.emptyState}>
                <p>Du har inga sparade favoriter ännu.</p>

                <Link href="/products" className={styles.emptyStateLink}>
                    Upptäck produkter
                </Link>
            </div>
        );
    }



    return (
        <div className={styles.favoritesGrid}>
            {favoriteProducts.map((product) => (
                <div key={product.id} className={styles.favoriteItem}>
                    <ProductCard product={product} />

                    <button className={styles.removeButton}
                        type="button"
                        onClick={() => removeFavorite(product.id)}
                    >
                        Ta bort från favoriter
                    </button>
                </div>
            ))}
        </div>
    );
}