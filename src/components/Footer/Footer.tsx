import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
            {/* Varumärke och presentation */}
            <div>
                <p>KingHouse Design</p>
                <p>
                    KingHouse Design är en kuraterad webbshop för skandinaviska
                    ljusstakar och doftljus.
                </p>
            

            {/* Sociala medier */}
            <div>

                <a href="#" aria-label="Instagram">
                    {/* Instagram-ikon */}
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <rect x="3" y="3" width="18" height="18" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="1" />
                    </svg>
                </a>

                <a href="#" aria-label="Pinterest">
                    {/* Pinterest-ikon */}
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M10 18l2-8" />
                        <path d="M9.5 10.5c0-2 1.5-3.5 3.7-3.5 2.1 0 3.3 1.3 3.3 3.1 0 2.6-1.2 4.7-3 4.7-1 0-1.7-.8-1.5-1.8" />
                    </svg>
                </a>


                <a href="#" aria-label="Facebook">
                    {/* Facebook-ikon */}
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M13.5 8H15V5.5h-1.5c-2.5 0-4 1.5-4 4V11H7v2.5h2.5V19H12v-5.5h2.5L15 11h-3V9.5c0-1 .5-1.5 1.5-1.5Z" />
                    </svg>
                </a>
            </div>

            </div>

            {/* Länkar för kunder */}
            <div>
                <h2 className={styles.footerHeading}>Kunder</h2>

                <nav className={styles.footerNav} aria-label="Kundlänkar">
                    <Link href="/products">Produkter</Link>
                    <Link href="/favorites">Favoriter</Link>
                    {/* <Link href="/shipping">Leverans & frakt</Link> */}
                    {/* <Link href="/returns">Returer</Link> */}
                    {/* <Link href="/faq">Vanliga frågor</Link> */}
                </nav>
            </div>

            {/* Informationslänkar */}
            <div>
                <h2 className={styles.footerHeading}>Information</h2>

                <nav className={styles.footerNav} aria-label="Informationslänkar">
                    <Link href="/about">Om oss</Link>
                    <Link href="/contact">Kontakt</Link>
                    {/* <Link href="/privacy">Integritetspolicy</Link> */}
                    {/* <Link href="/terms">Villkor</Link> */}
                </nav>
            </div>

            {/* Kontaktuppgifter */}
            <div>
                <h2 className={styles.footerHeading}>Kontakt</h2>

                <address className={styles.contact}>
                    <a href="mailto:info@kinghousedesign.se">
                        info@kinghousedesign.se
                    </a>

                    <a href="tel:+4681234567">
                        08-123 45 67
                    </a>

                    <p>Stockholm, Sverige</p>
                </address>
            </div>
            </div>

            {/* Copyright och rättigheter */}
            <div>
                <p>
                    &copy; {new Date().getFullYear()} KingHouse Design
                    {" · "}
                    Alla rättigheter förbehållna
                </p>
            </div>
        </footer>
    );
}