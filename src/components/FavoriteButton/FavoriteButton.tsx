"use client";

import { useEffect, useState } from "react";
import styles from "./FavoriteButton.module.css";


interface FavoriteButtonProps {
    productId: string;
}


export default function FavoriteButton({
    productId,
}: FavoriteButtonProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    // Kontrollerar om produkten redan finns sparad som favorit, läser nyckeln "favorites" från localStorage
    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        // om något finns där, gör om JSON-texten till en array
        if (storedFavorites) {
            const favorites: string[] = JSON.parse(storedFavorites);
            //kontrollerar om aktuell productId redan finns i arrayen o sätter isFavorite till rätt värde
            setIsFavorite(favorites.includes(productId));
        }
    }, [productId]);

    // Växlar produktens favoritstatus
    function toggleFavorite() {
        // Hämtar sparade favoriter från localStorage
        const storedFavorites = localStorage.getItem("favorites");
        // Om det finns sparade favoriter, gör om JSON-texten till en array, annars skapa en tom array
        const favorites: string[] = storedFavorites
            ? JSON.parse(storedFavorites)
            : [];
        // Om produkten inte redan finns i favoriter
        if (!favorites.includes(productId)) {
            // Lägger till produkten som favorit
            favorites.push(productId);
            // Sparar den uppdaterade listan i localStorage
            localStorage.setItem("favorites", JSON.stringify(favorites));
            // Uppdaterar state för att visa att produkten nu är en favorit
            setIsFavorite(true);
        }
        else {
            // Tar bort aktuell produkt från favoriter
            const updatedFavorites = favorites.filter(
                // Behåll bara de produkter vars id inte matchar productId
                (id) => id !== productId
            );

            // Sparar den uppdaterade listan i localStorage
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

            // Uppdaterar state för att visa att produkten inte längre är en favorit
            setIsFavorite(false);
        }
    }

    // Kopplar funktionen till knappen
    return (
        <button
            type="button"
            // Dynamiskt lägger till en CSS-klass om produkten är en favorit
            className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteButtonActive : "" }`}
            onClick={toggleFavorite}
        >
            {isFavorite ? "Sparad som favorit" : "Spara som favorit"}
        </button>
    );
}
//isFavorite === false → bara favoriteButton
//isFavorite === true → favoriteButton + favoriteButtonActive