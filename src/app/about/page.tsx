import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";



export default function AboutPage() {
  return (
    <main id="main-content" className={styles.aboutPage}>
      {/* Introduktion till KingHouse Design */}
      <section className={styles.intro}>
        <p className={styles.eyebrow}>Om KingHouse Design</p>

        <h1 className={styles.title}>Det lilla som gör ett hem personligt</h1>

        <p className={styles.introText}>
          KingHouse Design är en kuraterad webbshop med fokus på
          skandinaviska ljusstakar och doftljus. Vi tror på ett mindre,
          genomtänkt sortiment där varje produkt har valts ut för att skapa
          värme, karaktär och en känsla av lugn i hemmet.
        </p>
      </section>

      {/* Berättar om idén bakom webbshoppen */}
      <section className={styles.storySection}>
        <div className={styles.storyContent}>
          <p className={styles.sectionEyebrow}>Vår idé</p>

          <h2 className={styles.sectionTitle}>
            Färre val, mer känsla
          </h2>

          <p>
            Att hitta rätt inredningsdetaljer ska kännas inspirerande, inte
            överväldigande. I stora sortiment kan det vara svårt att hitta de
            produkter som verkligen passar den egna stilen.
          </p>

          <p>
            Därför bygger KingHouse Design på en enkel idé: färre produkter,
            noggrant utvalda. Vi samlar tidlösa detaljer med en skandinavisk
            känsla för att göra det enklare att hitta något som passar både
            hemmet och vardagen.
          </p>
        </div>

        <div className={styles.storyImageWrapper}>
          <Image
            className={styles.storyImage}
            src="/images/products/about-kinghouse-design2.webp"
            alt="Doftljus från KingHouse Design i en varm skandinavisk hemmiljö"
            width={800}
            height={800}
          />
        </div>
      </section>

      {/* Beskriver hur sortimentet väljs ut */}
      <section className={styles.curatedSection}>
        <div className={styles.curatedInner}>
          <div className={styles.curatedHeading}>
            <p className={styles.sectionEyebrow}>Vårt sortiment</p>

            <h2 className={styles.sectionTitle}>
              Noggrant utvalt
            </h2>
          </div>

          <div className={styles.curatedContent}>
            <p>
              För oss handlar ett kuraterat sortiment inte om att erbjuda mest,
              utan om att välja med omsorg. Form, färg, material och känsla får
              tillsammans avgöra vilka produkter som får ta plats i vårt
              sortiment.
            </p>

            <p>
              Resultatet är en mindre kollektion där produkterna fungerar fint
              var för sig, men också tillsammans i ett harmoniskt hem.
            </p>
          </div>
        </div>
      </section>

      {/* Beskriver varför ljusstakar och doftljus står i centrum */}
      <section className={styles.detailsSection}>
        <div className={styles.detailsHeading}>
          <p className={styles.sectionEyebrow}>Känslan i hemmet</p>

          <h2 className={styles.sectionTitle}>
            Detaljer som skapar värme i hemmet
          </h2>
        </div>

        <div className={styles.detailsContent}>
          <p>
            Ett hem formas inte bara av de stora möblerna. Ofta är det de små
            detaljerna som förändrar känslan i ett rum. Ett levande ljus kan
            skapa värme, medan en väl vald doft kan ge rummet en helt egen
            karaktär.
          </p>

          <p>
            Därför har ljusstakar och doftljus fått stå i centrum hos
            KingHouse Design - enkla detaljer som kan göra stor skillnad.
          </p>
        </div>
      </section>

      {/* Beskriver KingHouse Designs visuella filosofi */}
      <section className={styles.designSection}>
        <div className={styles.designImageWrapper}>
          <Image
            className={styles.designImage}
            src="/images/products/about-scandinavian-design.webp"
            alt="Skandinavisk ljusstake och doftljus från KingHouse Design i en varm, minimalistisk miljö"
            width={800}
            height={800}
          />
        </div>

        <div className={styles.designContent}>
          <p className={styles.sectionEyebrow}>Vårt uttryck</p>

          <h2 className={styles.sectionTitle}>
            Skandinavisk enkelhet
          </h2>

          <p>
            Vi inspireras av den skandinaviska designtraditionen där
            funktion, enkelhet och naturliga toner möts. Vårt uttryck är
            avskalat och varmt, med produkter som får ta plats utan att ta
            över.
          </p>
        </div>
      </section>

      {/* Leder användaren vidare till produktsortimentet */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <p className={styles.sectionEyebrow}>Upptäck KingHouse</p>

          <h2 className={styles.ctaTitle}>
            Hitta dina favoriter
          </h2>

          <p className={styles.ctaText}>
            Utforska vårt utvalda sortiment och hitta de detaljer som skapar
            rätt känsla i just ditt hem.
          </p>

          <Link href="/products" className={styles.ctaLink}>
            Upptäck vårt sortiment
          </Link>
        </div>
      </section>
    </main>
  );
}