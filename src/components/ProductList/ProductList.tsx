"use client";

import { useState } from "react";
import type { Product } from "@/types/Product";
import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./ProductList.module.css";


interface ProductListProps {
    products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
    //state-variabeln som ska hålla reda på vilket filter som är aktivt
    const [activeFilter, setActiveFilter] = useState("all");


    // Filtrerar produkter utifrån vald kategori
    const filteredProducts =
        activeFilter === "all"
            ? products
            : products.filter((product) => product.category === activeFilter);
    // Är filtret "all"? Ja → använd alla products.
    // Nej → filtrera och behåll bara produkter vars category är samma som activeFilter.

    return (
        <>
            {/* Filter för produktkategorier */}
            <div className={styles.filters}>
                <button className={`${styles.filterButton} ${activeFilter === "all" ? styles.activeFilter : ""}`}
                    type="button"
                    onClick={() => setActiveFilter("all")}>
                    Alla
                </button>
                <button className={`${styles.filterButton} ${activeFilter === "candlestick" ? styles.activeFilter : ""}`}
                    type="button"
                    onClick={() => setActiveFilter("candlestick")}>
                    Ljusstakar
                </button>
                <button className={`${styles.filterButton} ${activeFilter === "scented-candle" ? styles.activeFilter : ""}`}
                    type="button"
                    onClick={() => setActiveFilter("scented-candle")}>
                    Doftljus
                </button>
            </div>

            <div className={styles.productGrid}>
                {/* Renderar ProductCard för varje produkt i filteredProducts */}
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    );

    // activeFilter = vilket filter som är valt just nu
    // setActiveFilter = funktionen vi använder för att byta filter
    // "all" = startvärdet, alltså att Alla visas från början
}