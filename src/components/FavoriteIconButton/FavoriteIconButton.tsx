"use client";

import { useEffect, useState } from "react";

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

    if (!favorites.includes(productId)) {
      favorites.push(productId);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    } else {
      const updatedFavorites = favorites.filter(
        (id) => id !== productId
      );

      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(false);
    }
  }

  return (
    <button
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