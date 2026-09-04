"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
    // Håller reda på om mobilmenyn är öppen eller stängd
    const [isMenuOpen, setIsMenuOpen] = useState(false);

      // Stänger mobilmenyn efter att användaren har valt en navigationslänk
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className={styles.header}>
        {/* Logotyp som leder tillbaka till startsidan. stänger också mobilmenyn */}
        <Link href="/" className={styles.logo} onClick={closeMenu}>
            KingHouse Design
        </Link>

            {/* Knapp för att öppna och stänga mobilmenyn */}
            <button
            /* .menuOpen i CSS för att rotera linjerna till ett X */
                className={`${styles.menuButton} ${isMenuOpen ? styles.menuOpen : ""}`} /* Lägg till en klass om menyn är öppen */
                type="button"
                aria-label={isMenuOpen ? "Stäng meny" : "Öppna meny"} /* Aria-label ändras beroende på om menyn är öppen eller stängd */
                aria-expanded={isMenuOpen} /* Aria-expanded indikerar om menyn är öppen eller stängd */
                aria-controls="main-navigation" /* aria-controls och id kopplar ihop knappen med navigationen för hjälpmedel */
                onClick={() => setIsMenuOpen(!isMenuOpen)} /* Toggle onClick växlar mellan true och false */
                // onClick={() => setIsMenuOpen((prev) => !prev)}   React-sätt att toggla state
            >

                {/* Dekorativa linjer som animeras från hamburgare till ett X */}
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </button>

            <nav
                id="main-navigation"
                className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`} /* Hamburgaren klickas och isMenuOpen true får navigationen även .navOpen*/
                aria-label="Huvudnavigation"
            >
                <Link href="/" onClick={closeMenu}>
                    Hem
                </Link>
                <Link href="/products" onClick={closeMenu}>
                    Produkter
                </Link>
                <Link href="/favorites" onClick={closeMenu}>
                    Favoriter
                </Link>
                <Link href="/about" onClick={closeMenu}>
                    Om oss
                </Link>
                <Link href="/contact" onClick={closeMenu}>
                    Kontakt
                </Link>
            </nav>
        </header>
    );
}