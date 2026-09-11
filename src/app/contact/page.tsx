"use client";

import { useState } from "react";



export default function ContactPage() {

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Hanterar formuläret och visar en bekräftelse efter skickat meddelande
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);
  }


  return (
    <main id="main-content">
      {/* Introduktion till kontaktsidan */}
      <section>
        <p>Kontakt</p>

        <h1>Vi hjälper dig gärna</h1>

        <p>
          Har du en fråga om våra produkter, vårt sortiment eller
          KingHouse Design? Hör gärna av dig. Vi hjälper dig gärna
          att hitta svar på dina frågor.
        </p>
      </section>

      {/* Kontaktinformation */}
      <section>
        <p>Kundservice</p>

        <h2>Kom i kontakt med oss</h2>

        <p>
          Du är alltid välkommen att kontakta oss om du har frågor
          eller funderingar.
        </p>

        <p>
          E-post: kundservice@kinghousedesign.se
        </p>

        <p>
          Telefon: 08-410 245 80
        </p>

        <p>
          Vi svarar vanligtvis inom 1–2 vardagar.
        </p>
      </section>

      {/* Kontaktformulär */}
      <section>
        <p>Skicka ett meddelande</p>

        <h2>Vad kan vi hjälpa dig med?</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Namn</label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              required
            />
          </div>

          <div>
            <label htmlFor="email">E-post</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="subject">Ämne</label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
            />
          </div>

          <div>
            <label htmlFor="message">Meddelande</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
            />
          </div>

          <button type="submit">
            Skicka meddelande
          </button>
        </form>
        {isSubmitted && (
          <p role="status">
            Tack för ditt meddelande! Vi återkommer till dig så snart vi kan.
          </p>
        )}


      </section>
    </main>
  );
}