import Link from "next/link";

export default function AboutPage() {
  return (
    <main id="main-content">
      {/* Introduktion till KingHouse Design */}
      <section>
        <p>Om KingHouse Design</p>

        <h1>Det lilla som gör ett hem personligt</h1>

        <p>
          KingHouse Design är en kuraterad webbshop med fokus på
          skandinaviska ljusstakar och doftljus. Vi tror på ett mindre,
          genomtänkt sortiment där varje produkt har valts ut för att skapa
          värme, karaktär och en känsla av lugn i hemmet.
        </p>
      </section>

      {/* Berättar om idén bakom webbshoppen */}
      <section>
        <h2>Vår idé</h2>

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
      </section>

      {/* Beskriver hur sortimentet väljs ut */}
      <section>
        <h2>Noggrant utvalt</h2>

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
      </section>

      {/* Fokus på ljusstakar och doftljus */}
      <section>
        <h2>Detaljer som skapar känsla</h2>

        <p>
          Ett hem formas inte bara av de stora möblerna. Ofta är det de små
          detaljerna som förändrar känslan i ett rum. Ett levande ljus kan
          skapa värme, medan en väl vald doft kan ge rummet en helt egen
          karaktär.
        </p>

        <p>
          Därför har ljusstakar och doftljus fått stå i centrum hos
          KingHouse Design – enkla detaljer som kan göra stor skillnad.
        </p>
      </section>

      {/* KingHouse Designs visuella filosofi */}
      <section>
        <h2>Skandinavisk enkelhet</h2>

        <p>
          Vi inspireras av den skandinaviska designtraditionen där
          funktion, enkelhet och naturliga toner möts. Vårt uttryck är
          avskalat och varmt, med produkter som får ta plats utan att ta
          över.
        </p>
      </section>

      {/* Leder användaren vidare till sortimentet */}
      <section>
        <h2>Hitta dina favoriter</h2>

        <p>
          Utforska vårt utvalda sortiment och hitta de detaljer som skapar
          rätt känsla i just ditt hem.
        </p>

        <Link href="/products">Upptäck vårt sortiment</Link>
      </section>
    </main>
  );
}