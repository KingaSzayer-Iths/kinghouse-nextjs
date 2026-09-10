import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
    return (
        <main id="main-content" className={styles.notFound}>
            <section className={styles.content}>
                <p className={styles.errorCode}>404</p>

                {/* Visuell representation av en slocknad ljuslåga */}
                <div className={styles.candle} aria-hidden="true">
                    <span className={styles.flame}></span>
                    <span className={styles.wick}></span>
                    <span className={styles.candleBody}></span>
                </div>

                <h1>Oj, här slocknade visst ljuset.</h1>

                <p className={styles.message}>
                    Sidan du söker verkar ha försvunnit i mörkret.
                    Tänd vägen tillbaka genom att gå till startsidan
                    och upptäck våra produkter.
                </p>
                {/* Visuella knappar som leder användaren tillbaka till startsidan eller produktsidan */}
                <div className={styles.actions}>
                    <Link href="/" className={styles.primaryLink}>
                        Till startsidan
                    </Link>

                    <Link href="/products" className={styles.secondaryLink}>
                        Upptäck produkter
                    </Link>
                </div>
            </section>
        </main>
    );
}