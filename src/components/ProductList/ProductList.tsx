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

    // State-variabel som håller reda på vilken produktsida som visas
    const [currentPage, setCurrentPage] = useState(1);

    // Antal produkter som visas per sida
    const productsPerPage = 8;


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


    // Räknar ut index för den första och sista produkten på aktuell sida
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    // Hämtar de produkter som ska visas på aktuell sida
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    // Räknar ut hur många produktsidor som behövs
    const totalPages = Math.ceil(
        filteredProducts.length / productsPerPage
    );

    return (
        <>

            {/* Sökfält för att filtrera produkter baserat på namn, kategori eller färg */}
            <div className={styles.search}>
                <label htmlFor="product-search">Sök produkter</label>

                <input
                    id="product-search"
                    type="search"
                    value={searchTerm}
                    onChange={(event) => {
                        // searchTerm uppdateras med det användaren skriver i sökfältet
                        setSearchTerm(event.target.value);
                        // currentPage återställs till sida 1
                        setCurrentPage(1);
                    }}
                    placeholder="Sök efter namn, kategori eller färg"
                />

                {searchTerm && (
                    <button className={styles.clearSearchButton}
                        type="button"
                        // Rensar sökfältet när knappen klickas, en tom sökning - alla produkter kommer att visas igen
                        onClick={() => {
                            setSearchTerm("");
                            // currentPage återställs till sida 1
                            setCurrentPage(1);
                        }}
                    >
                        Rensa sökning
                    </button>
                )}
            </div>


            {/* Filter för produktkategorier */}
            <div className={styles.filters}>
                <button className={`${styles.filterButton} ${activeFilter === "all" ? styles.activeFilter : ""}`}
                    type="button"
                    onClick={() => {
                        setActiveFilter("all");
                        setCurrentPage(1);
                    }}>
                    Alla
                </button>
                <button className={`${styles.filterButton} ${activeFilter === "candlestick" ? styles.activeFilter : ""}`}
                    type="button"
                    onClick={() => {
                        setActiveFilter("candlestick");
                        setCurrentPage(1);
                    }}>
                    Ljusstakar
                </button>
                <button className={`${styles.filterButton} ${activeFilter === "scented-candle" ? styles.activeFilter : ""}`}
                    type="button"
                    onClick={() => {
                        setActiveFilter("scented-candle");
                        setCurrentPage(1);
                    }}>
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
                    {/* Renderar ProductCard för varje produkt i currentProducts */}
                    {currentProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {/* totalPages > 1 - Visar pagination knappar om det finns fler än en sida med produkter */}
            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button
                        type="button"
                        onClick={() => setCurrentPage(currentPage - 1)}

                        /* Om currentPage är 1, inaktivera knappen för att gå till föregående sida */
                        disabled={currentPage === 1}
                    >
                        Föregående
                    </button>

                    <span>
                        Sida {currentPage} av {totalPages}
                    </span>

                    <button
                        type="button"
                        onClick={() => setCurrentPage(currentPage + 1)}

                        /* Om currentPage är lika med totalPages, inaktivera knappen för att gå till nästa sida */
                        disabled={currentPage === totalPages}
                    >
                        Nästa
                    </button>
                </div>
            )}
        </>
    );

    // activeFilter = vilket filter som är valt just nu
    // setActiveFilter = funktionen vi använder för att byta filter
    // "all" = startvärdet, alltså att Alla visas från början
}