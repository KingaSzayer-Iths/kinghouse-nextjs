"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/Product";
import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./FavoritesList.module.css";
import Link from "next/link";
import productsData from "@/data/products.json";

export default function FavoritesList() {
    // State-variabel som håller reda på vilka produkter som är favoriter ["1", "5"]
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

    // State-variabel som innehåller de fullständiga favoritprodukterna
    const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

    // Läser sparade favoriter från localStorage och kopplar sedan
    // favorit-id:na till motsvarande produkter från den lokala JSON-filen.
    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");

        // Gör om de sparade favorit-id:na från JSON-text till en array.
        // Om inga favoriter finns används en tom array.
        const favorites: string[] = storedFavorites
            ? JSON.parse(storedFavorites)
            : [];

        // Sparar favorit-id:na i state så att de kan användas
        // när en produkt senare tas bort från favoriter.
        setFavoriteIds(favorites);

        // Om användaren inte har några favoriter
        // används en tom lista med favoritprodukter.
        if (favorites.length === 0) {
            setFavoriteProducts([]);
            return;
        }

        // Hämtar produktinformationen direkt från den lokala JSON-filen.
        const products = productsData.products as Product[];

        // Filtrerar fram endast de produkter vars id finns
        // bland användarens sparade favoriter.
        const matchingFavorites = products.filter((product) =>
            favorites.includes(product.id)
        );

        // Sparar de fullständiga favoritprodukterna i state.
        setFavoriteProducts(matchingFavorites);
    }, []);

    // Tar bort en produkt från favoriter
    function removeFavorite(productId: string) {
        const updatedFavoriteIds = favoriteIds.filter(
            (id) => id !== productId
        );

        localStorage.setItem(
            "favorites",
            JSON.stringify(updatedFavoriteIds)
        );

        // Uppdaterar state med den nya listan av favorit-id:n.
        setFavoriteIds(updatedFavoriteIds);

        // Uppdaterar även listan med favoritprodukter direkt.
        // Då behöver sidan inte läsa in produktinformationen igen
        // bara för att en favorit tas bort.
        setFavoriteProducts((currentProducts) =>
            currentProducts.filter(
                (product) => product.id !== productId
            )
        );
    }

    // Om arrayen är tom visas ett meddelande
    // istället för en tom produktgrid.
    if (favoriteProducts.length === 0) {
        return (
            <div className={styles.emptyState}>
                <p>Du har inga sparade favoriter ännu.</p>

                <Link
                    href="/products"
                    className={styles.emptyStateLink}
                >
                    Upptäck produkter
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.favoritesGrid}>
            {favoriteProducts.map((product, index) => (
                <div
                    key={product.id}
                    className={styles.favoriteItem}
                >
                    <ProductCard
                        product={product}

                        // Prioriterar bara den första favoritbilden.
                        // Den ligger högst i produktlistan och kan påverka sidans LCP.
                        priority={index === 0}
                    />

                    <button
                        className={styles.removeButton}
                        type="button"
                        onClick={() =>
                            removeFavorite(product.id)
                        }
                    >
                        Ta bort från favoriter
                    </button>
                </div>
            ))}
        </div>
    );
}