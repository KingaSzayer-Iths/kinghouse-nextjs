"use client";

import { useState } from "react";
import type { CartItem } from "@/types/CartItem";
import styles from "./AddToCartButton.module.css";


interface AddToCartButtonProps {
    productId: string;
}

export default function AddToCartButton({
    productId,
}: AddToCartButtonProps) {
    const [isAdded, setIsAdded] = useState(false);

    function handleAddToCart() {
        // Hämtar den nuvarande kundvagnen från localStorage, om den finns
        const storedCart = localStorage.getItem("cart");

        // Skapar en array med produkter och antal: productId: string; quantity: number
        const cart: CartItem[] = storedCart
            ? JSON.parse(storedCart)
            : [];

        // Kontrollerar om produkten redan finns i kundvagnen
        const existingItem = cart.find(
            (item) => item.productId === productId
        );

        if (existingItem) {
            // Ökar antalet om produkten redan finns
            existingItem.quantity += 1;
        } else {
            // Lägger till produkten med antal 1
            cart.push({
                productId,
                quantity: 1,
            });
        }

        // Sparar den uppdaterade kundvagnen i localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Meddelar andra komponenter att kundkorgen har uppdaterats
        window.dispatchEvent(new Event("cartUpdated"));

        // Visar en kort bekräftelse på knappen
        setIsAdded(true);

        setTimeout(() => {
            setIsAdded(false);
        }, 1500);
    }

    return (
<button className={styles.addToCartButton}
    type="button"    
    onClick={handleAddToCart}
>
    {isAdded ? "Tillagd i kundkorgen ✓" : "Lägg i kundkorg"}
</button>
    );
}