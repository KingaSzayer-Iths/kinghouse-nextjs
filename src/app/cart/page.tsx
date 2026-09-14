"use client";

import { useEffect, useState } from "react";
import type { CartItem } from "@/types/CartItem";
import type { Product } from "@/types/Product";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import productsData from "@/data/products.json";

export default function CartPage() {
    // Sparar kundkorgens produkter och antal i state
    const [cart, setCart] = useState<CartItem[]>([]);

    // Håller reda på om kundkorgen har lästs in från localStorage
    const [isCartLoaded, setIsCartLoaded] = useState(false);

    // Sparar produktinformationen som hämtas från mock-API:t
    const [products, setProducts] = useState<Product[]>([]);

    // Håller reda på om produktinformationen har hämtats från mock-API:t
    const [isProductsLoaded, setIsProductsLoaded] = useState(false);

    // Räknar ihop quantity för alla produkter i kundkorgen
    // reduce() går igenom hela cart-arrayen och bygger upp en totalsumma
    // 0 är startvärdet för total
    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    // Kopplar ihop varje produkt i kundkorgen med dess fullständiga
    // produktinformation från mock-API:t
    const cartProducts = cart.flatMap((item) => {
        // find() söker efter produkten vars id matchar productId i kundkorgen
        const product = products.find(
            (product) => product.id === item.productId
        );

        // Om produkten inte hittas returneras en tom array,
        // så att den inte läggs till i cartProducts
        if (!product) {
            return [];
        }

        // Skapar ett objekt som innehåller både produktinformationen
        // och det antal som användaren har lagt i kundkorgen
        return [
            {
                product,
                quantity: item.quantity,
            },
        ];
    });

    // Räknar ut hela kundkorgens totalsumma
    // För varje produkt multipliceras priset med antalet och läggs till totalen
    const totalPrice = cartProducts.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    // Hämtar kundkorgen från localStorage när sidan laddas
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");

        // Om det finns en kundkorg sparad i localStorage,
        // uppdateras state med den
        const savedCart: CartItem[] = storedCart
            ? JSON.parse(storedCart)
            : [];

        setCart(savedCart);

        // Markerar att kundkorgen nu har lästs in från localStorage
        setIsCartLoaded(true);
    }, []);

    // Läser produktinformationen från den lokala JSON-filen
    useEffect(() => {
        const data = productsData.products as Product[];

        setProducts(data);

        // Markerar att produktinformationen nu har lästs in
        setIsProductsLoaded(true);
    }, []);

    // Ökar antalet för den produkt som användaren klickar på
    function increaseQuantity(productId: string) {
        // map() går igenom alla produkter i kundkorgen
        // och skapar en ny array
        const updatedCart = cart.map((item) =>
            // Om produktens id matchar productId skapas en kopia
            // av objektet där quantity ökas med 1
            item.productId === productId
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                }
                : item
        );

        // Uppdaterar kundkorgens state så att sidan direkt visar det nya antalet
        setCart(updatedCart);

        // Sparar även ändringen i localStorage
        // så att den finns kvar efter omladdning
        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );

        // Meddelar headern att kundkorgen har ändrats
        // så att badgen uppdateras direkt
        window.dispatchEvent(new Event("cartUpdated"));
    }

    // Minskar antalet för den produkt som användaren klickar på
    function decreaseQuantity(productId: string) {
        // map() går igenom alla produkter och skapar en ny array
        // För produkten som matchar productId minskas quantity med 1
        const updatedCart = cart
            .map((item) =>
                item.productId === productId
                    ? {
                        ...item,
                        quantity: item.quantity - 1,
                    }
                    : item
            )
            // filter() behåller bara produkter som har ett antal större än 0
            // Om quantity blir 0 tas produkten därför bort helt från kundkorgen
            .filter((item) => item.quantity > 0);

        // Uppdaterar state så att det nya antalet visas direkt på sidan
        setCart(updatedCart);

        // Sparar ändringen så att kundkorgen finns kvar efter omladdning
        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );

        // Meddelar headern så att kundkorgens badge uppdateras direkt
        window.dispatchEvent(new Event("cartUpdated"));
    }

    // Tar bort hela produkten från kundkorgen
    // oavsett hur många exemplar som finns
    function removeFromCart(productId: string) {
        // filter() skapar en ny array och behåller alla produkter
        // utom den vars productId matchar produkten som ska tas bort
        const updatedCart = cart.filter(
            (item) => item.productId !== productId
        );

        // Uppdaterar kundkorgens state
        // så att produkten försvinner direkt från sidan
        setCart(updatedCart);

        // Sparar den uppdaterade kundkorgen i localStorage
        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );

        // Meddelar headern så att kundkorgens badge uppdateras direkt
        window.dispatchEvent(new Event("cartUpdated"));
    }

    // Väntar tills både kundkorgen från localStorage och
    // produktinformationen från mock-API:t har lästs in.
    // Under tiden behålls sidans main-element så att footern
    // inte flyttar sig upp och sedan skjuts ned igen.
    if (!isCartLoaded || !isProductsLoaded) {
        return (
            <main
                id="main-content"
                className={styles.cartPage}
                aria-busy="true"
            >
                <h1 className={styles.cartTitle}>
                    Kundkorg
                </h1>

                <p>Laddar kundkorgen...</p>
            </main>
        );
    }

    return (
        <main
            id="main-content"
            className={styles.cartPage}
        >
            <h1 className={styles.cartTitle}>
                Kundkorg
            </h1>

            {/* Visar olika innehåll beroende på om kundkorgen
            är tom eller innehåller produkter */}
            {cart.length === 0 ? (
                <section
                    className={styles.emptyCart}
                    aria-labelledby="empty-cart-heading"
                >
                    {/* Visas när kundkorgen inte innehåller några produkter */}
                    <h2
                        id="empty-cart-heading"
                        className={styles.emptyCartTitle}
                    >
                        Din kundkorg är tom
                    </h2>

                    <p className={styles.emptyCartText}>
                        Här finns inga produkter ännu.
                        Utforska vårt sortiment och hitta
                        något som passar ditt hem.
                    </p>

                    {/* Leder användaren tillbaka till produktsidan */}
                    <Link
                        href="/products"
                        className={styles.productsLink}
                    >
                        Utforska våra produkter
                    </Link>
                </section>
            ) : (
                <div className={styles.cartContent}>
                    {/* Visar det totala antalet produkter i kundkorgen */}
                    <p className={styles.cartQuantity}>
                        Totalt antal produkter: {totalQuantity}
                    </p>

                    {/* map() går igenom alla produkter i kundkorgen
                    och skapar innehållet som visas för varje produkt */}
                    {cartProducts.map((item, index) => (
                        <div
                            key={item.product.id}
                            className={styles.cartItem}
                        >
                            <Image
                                className={styles.cartItemImage}
                                src={item.product.image}
                                alt={item.product.alt}
                                width={120}
                                height={120}
                                // Hjälper Next.js att välja en lämplig bildstorlek för kundkorgen.
                                // På mobil kan bilden bli upp till 16rem bred,
                                // medan den på större skärmar visas i cirka 9.8rem.
                                sizes="(max-width: 47.99rem) 16rem, 9.8rem"
                                // Den första produktbilden ligger högst i kundkorgen och kan bli sidans LCP.
                                // Därför laddas den direkt, medan övriga bilder använder vanlig lazy loading.
                                loading={index === 0 ? "eager" : undefined}
                            />

                            {/* Samlar produktinformation och kontroller
                            i produktkortets andra grid-kolumn */}
                            <div className={styles.cartItemInfo}>
                                <h2 className={styles.cartItemName}>
                                    {item.product.name}
                                </h2>

                                <p className={styles.cartItemPrice}>
                                    Pris: {item.product.price} kr
                                </p>

                                <div className={styles.quantityControls}>
                                    {/* Minskar antalet för produkten med ett steg */}
                                    <button
                                        className={styles.quantityButton}
                                        type="button"
                                        onClick={() =>
                                            decreaseQuantity(item.product.id)
                                        }
                                        aria-label={`Minska antal för ${item.product.name}`}
                                    >
                                        -
                                    </button>

                                    {/* Visar hur många exemplar av produkten
                                    som finns i kundkorgen */}
                                    <span className={styles.quantityValue}>
                                        {item.quantity}
                                    </span>

                                    {/* Ökar antalet för produkten med ett steg */}
                                    <button
                                        className={styles.quantityButton}
                                        type="button"
                                        onClick={() =>
                                            increaseQuantity(item.product.id)
                                        }
                                        aria-label={`Öka antal för ${item.product.name}`}
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    className={styles.removeButton}
                                    type="button"
                                    onClick={() =>
                                        removeFromCart(item.product.id)
                                    }
                                    aria-label={`Ta bort ${item.product.name} från kundkorgen`}
                                >
                                    Ta bort
                                </button>

                                {/* Visar produktens pris multiplicerat med antalet */}
                                <p className={styles.subtotal}>
                                    Delsumma:{" "}
                                    {item.product.price * item.quantity} kr
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Visar totalsumman för alla produkter i kundkorgen */}
                    <p className={styles.cartTotal}>
                        Totalsumma: {totalPrice} kr
                    </p>
                </div>
            )}
        </main>
    );
}