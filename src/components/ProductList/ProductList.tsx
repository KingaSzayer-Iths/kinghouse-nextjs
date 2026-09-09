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

    // State-variabel som håller reda på användaren skriver i sökfältet
    const [searchTerm, setSearchTerm] = useState("");


    // Filtrerar produkter utifrån vald kategori
    const categoryFilteredProducts =
        activeFilter === "all"
            ? products
            : products.filter((product) => product.category === activeFilter);

    // Filtrerar produkterna utifrån användarens söktext
    const filteredProducts = categoryFilteredProducts.filter((product) => {
        const search = searchTerm.trim().toLowerCase();

        // Översätter den interna kategorin till svenska för sökningen
        const categoryName =
            product.category === "candlestick" ? "ljusstake" : "doftljus";


        return (
            product.name.toLowerCase().includes(search) ||
            categoryName.includes(search) ||
            product.color.toLowerCase().includes(search)
        );
    });
    // Är filtret "all"? Ja → använd alla products.
    // Nej → filtrera och behåll bara produkter vars category är samma som activeFilter.

    return (
        <>

            {/* Sökfält för att filtrera produkter baserat på namn, kategori eller färg */}
            <div className={styles.search}>
                <label htmlFor="product-search">Sök produkter</label>

                <input
                    id="product-search"
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Sök efter namn, kategori eller färg"
                />

                {searchTerm && (
                    <button className={styles.clearSearchButton}
                        type="button"
                        // Rensar sökfältet när knappen klickas, en tom sökning - alla produkter kommer att visas igen
                        onClick={() => setSearchTerm("")}
                    >
                        Rensa sökning
                    </button>
                )}
            </div>


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

            {/** Om inga produkter matchar sökningen, visa ett meddelande */}
            {filteredProducts.length === 0 ? (
                <p className={styles.noResults}>
                    Inga produkter matchar din sökning.
                </p>
            ) : (
                <div className={styles.productGrid}>
                    {/* Renderar ProductCard för varje produkt i filteredProducts */}
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </>
    );

    // activeFilter = vilket filter som är valt just nu
    // setActiveFilter = funktionen vi använder för att byta filter
    // "all" = startvärdet, alltså att Alla visas från början
}