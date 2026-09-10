"use client";

import { useEffect, useState } from "react";
import styles from "./FavoriteIconButton.module.css";



interface FavoriteIconButtonProps {
  productId: string;
}



export default function FavoriteIconButton({
  productId,
}: FavoriteIconButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Kontrollerar om produkten redan finns sparad som favorit
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");

    if (storedFavorites) {
      const favorites: string[] = JSON.parse(storedFavorites);
      setIsFavorite(favorites.includes(productId));
    }
  }, [productId]);

  // Växlar produktens favoritstatus
  function toggleFavorite() {
    const storedFavorites = localStorage.getItem("favorites");

    const favorites: string[] = storedFavorites
      ? JSON.parse(storedFavorites)
      : [];
    // Om produkten inte finns i favoriter, lägg till den. Annars, ta bort den.
    if (!favorites.includes(productId)) {
      favorites.push(productId);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    } else {
      const updatedFavorites = favorites.filter(
        (id) => id !== productId
      );
     // Uppdaterar localStorage med den nya listan av favoriter
      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(false);
    }
  }

  return (
    // Renderar en knapp som visar om produkten är en favorit eller inte. När knappen klickas, anropas toggleFavorite-funktionen.
    <button className={styles.favoriteIconButton}
      type="button"
      onClick={toggleFavorite}
      aria-label={
        isFavorite
          ? "Ta bort från favoriter"
          : "Lägg till i favoriter"
      }
    >
      {isFavorite ? "♥" : "♡"}
    </button>
  );
}