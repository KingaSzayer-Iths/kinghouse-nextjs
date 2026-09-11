"use client";


import { useEffect, useState } from "react";
import type { CartItem } from "@/types/CartItem";
import type { Product } from "@/types/Product";
import Image from "next/image";
import Link from "next/link";


export default function CartPage() {
    // Sparar kundkorgens produkter och antal i state
    const [cart, setCart] = useState<CartItem[]>([]);

    // Sparar produktinformationen som hämtas från mock-API:t
    const [products, setProducts] = useState<Product[]>([]);

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
        return [{
            product,
            quantity: item.quantity,
        }];
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

        // Om det finns en kundkorg sparad i localStorage, uppdatera state med den 
        const savedCart: CartItem[] = storedCart
            ? JSON.parse(storedCart)
            : [];

        setCart(savedCart);
    }, []);

    // Hämtar alla produkter från mock-API:t
    useEffect(() => {
        async function fetchProducts() {
            const response = await fetch("http://localhost:3001/products");
            const data: Product[] = await response.json();

            setProducts(data);
        }

        fetchProducts();
    }, []);

    // Ökar antalet för den produkt som användaren klickar på
    function increaseQuantity(productId: string) {
        // map() går igenom alla produkter i kundkorgen och skapar en ny array
        const updatedCart = cart.map((item) =>
            // Om produktens id matchar productId skapas en kopia av objektet
            // där quantity ökas med 1. Övriga produkter lämnas oförändrade
            item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );

        // Uppdaterar kundkorgens state så att sidan direkt visar det nya antalet
        setCart(updatedCart);

        // Sparar även ändringen i localStorage så att den finns kvar efter omladdning
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        // Meddelar headern att kundkorgen har ändrats så att badgen uppdateras direkt
        window.dispatchEvent(new Event("cartUpdated"));
    }

    // Minskar antalet för den produkt som användaren klickar på
    function decreaseQuantity(productId: string) {
        // map() går igenom alla produkter och skapar en ny array
        // För produkten som matchar productId minskas quantity med 1
        const updatedCart = cart
            .map((item) =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            // filter() behåller bara produkter som har ett antal större än 0
            // Om quantity blir 0 tas produkten därför bort helt från kundkorgen
            .filter((item) => item.quantity > 0);

        // Uppdaterar state så att det nya antalet visas direkt på sidan
        setCart(updatedCart);

        // Sparar ändringen så att kundkorgen finns kvar efter omladdning
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        // Meddelar headern så att kundkorgens badge uppdateras direkt
        window.dispatchEvent(new Event("cartUpdated"));
    }

    // Tar bort hela produkten från kundkorgen oavsett hur många exemplar som finns
    function removeFromCart(productId: string) {
        // filter() skapar en ny array och behåller alla produkter
        // utom den vars productId matchar produkten som ska tas bort
        const updatedCart = cart.filter(
            (item) => item.productId !== productId
        );

        // Uppdaterar kundkorgens state så att produkten försvinner direkt från sidan
        setCart(updatedCart);

        // Sparar den uppdaterade kundkorgen i localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        // Meddelar headern så att kundkorgens badge uppdateras direkt
        window.dispatchEvent(new Event("cartUpdated"));
    }

    return (
        <main id="main-content">
            <h1>Kundkorg</h1>
            {/* Visar olika innehåll beroende på om kundkorgen är tom eller innehåller produkter */}
            {cart.length === 0 ? (
                <section aria-labelledby="empty-cart-heading">
                    {/* Visas när kundkorgen inte innehåller några produkter */}
                    <h2 id="empty-cart-heading">
                        Din kundkorg är tom
                    </h2>

                    <p>
                        Här finns inga produkter ännu. Utforska vårt sortiment
                        och hitta något som passar ditt hem.
                    </p>

                    {/* Leder användaren tillbaka till produktsidan */}
                    <Link href="/products">
                        Utforska våra produkter
                    </Link>
                </section>
            ) : (
                <div>
                    {/* Visar det totala antalet produkter i kundkorgen */}
                    <p>
                        Totalt antal produkter: {totalQuantity}
                    </p>

                    {/* map() går igenom alla produkter i kundkorgen och skapar
                    innehållet som visas för varje enskild produkt */}
                    {cartProducts.map((item) => (
                        <div key={item.product.id}>
                            <Image
                                src={item.product.image}
                                alt={item.product.alt}
                                width={120}
                                height={120}
                            />

                            <h2>{item.product.name}</h2>

                            <p>
                                Pris: {item.product.price} kr
                            </p>

                            <div>
                                {/* Minskar antalet för just den här produkten med ett steg */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        decreaseQuantity(item.product.id)
                                    }
                                    aria-label={`Minska antal för ${item.product.name}`}
                                >
                                    −
                                </button>

                                {/* Visar hur många exemplar av produkten som finns i kundkorgen */}
                                <span>{item.quantity}</span>

                                {/* Ökar antalet för just den här produkten med ett steg */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        increaseQuantity(item.product.id)
                                    }
                                    aria-label={`Öka antal för ${item.product.name}`}
                                >
                                    +
                                </button>
                            </div>

                            {/* Tar bort hela produkten från kundkorgen oavsett antal */}
                            <button
                                type="button"
                                onClick={() =>
                                    removeFromCart(item.product.id)
                                }
                                aria-label={`Ta bort ${item.product.name} från kundkorgen`}
                            >
                                Ta bort
                            </button>

                            {/* Visar priset för produkten multiplicerat med antalet */}
                            <p>
                                Delsumma:{" "}
                                {item.product.price * item.quantity} kr
                            </p>
                        </div>
                    ))}

                    {/* Visar totalsumman för alla produkter i kundkorgen */}
                    <p>
                        Totalsumma: {totalPrice} kr
                    </p>
                </div>
            )}
        </main>
    );
}