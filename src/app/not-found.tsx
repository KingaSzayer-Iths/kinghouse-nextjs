import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content">
      <p>404</p>

      <h1>Oj, här slocknade visst ljuset.</h1>

      <p>
        Sidan du söker verkar ha försvunnit i mörkret.
        Tänd vägen tillbaka genom att gå till startsidan
        och upptäck våra produkter.
      </p>

      <div>
        <Link href="/">Till startsidan</Link>
        <Link href="/products">Upptäck produkter</Link>
      </div>
    </main>
  );
}