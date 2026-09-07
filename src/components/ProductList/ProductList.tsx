"use client";

import { useState } from "react";
import type { Product } from "@/types/Product";
import ProductCard from "@/components/ProductCard/ProductCard";


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
            <div>
                <button
                    type="button"
                    onClick={() => setActiveFilter("all")}>
                    Alla
                </button>
                <button
                    type="button"
                    onClick={() => setActiveFilter("candlestick")}>
                    Ljusstakar
                </button>
                <button
                    type="button"
                    onClick={() => setActiveFilter("scented-candle")}>
                    Doftljus
                </button>
            </div>

            <div>
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