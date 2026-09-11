"use client";

import { useState } from "react";
import styles from "./page.module.css";



export default function ContactPage() {

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Hanterar formuläret och visar en bekräftelse efter skickat meddelande
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);
  }


  return (
    <main id="main-content" className={styles.contactPage}>
      {/* Introduktion till kontaktsidan */}
      <section className={styles.intro}>
        <p className={styles.eyebrow}>Kontakt</p>

        <h1 className={styles.title}>Vi hjälper dig gärna</h1>

        <p className={styles.introText}>
          Har du en fråga om våra produkter, vårt sortiment eller
          KingHouse Design? Hör gärna av dig. Vi hjälper dig gärna
          att hitta svar på dina frågor.
        </p>
      </section>

      {/* Kontaktinformation och kontaktformulär */}
      <section className={styles.contactSection}>
        <div className={styles.contactInfo}>
          <p className={styles.sectionEyebrow}>Kundservice</p>

          <h2 className={styles.sectionTitle}>
            Kom i kontakt med oss
          </h2>

          <p className={styles.contactText}>
            Du är alltid välkommen att kontakta oss om du har frågor
            eller funderingar.
          </p>

          <div className={styles.contactDetails}>
            <div>
              <p className={styles.contactLabel}>E-post</p>
              <p>
                <a href="mailto:kundservice@kinghousedesign.se">
                  kundservice@kinghousedesign.se
                </a>
              </p>
            </div>

            <div>
              <p className={styles.contactLabel}>Telefon</p>
              <p>
                <a href="tel:+46841024580">
                  08-410 245 80
                </a>
              </p>
            </div>

            <div>
              <p className={styles.contactLabel}>Svarstid</p>
              <p>Vi svarar vanligtvis inom 1–2 vardagar.</p>
            </div>
          </div>
        </div>

        {/* Kontaktformulär */}
        <div className={styles.formWrapper}>
          <p className={styles.sectionEyebrow}>Skicka ett meddelande</p>

          <h2 className={styles.formTitle}>
            Vad kan vi hjälpa dig med?
          </h2>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Namn</label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">E-post</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject">Ämne</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Meddelande</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Skicka meddelande
            </button>
          </form>

          {isSubmitted && (
            <p className={styles.successMessage} role="status">
              Tack för ditt meddelande! Vi återkommer till dig så snart vi kan.
            </p>
          )}
        </div>

      </section>
    </main>
  );
}