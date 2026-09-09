import FavoritesList from "@/components/FavoritesList/FavoritesList";
import styles from "./page.module.css";




export default function FavoritesPage() {
  return (
    <main id="main-content" className={styles.favoritesPage}>
      <h1 className={styles.title}>Favoriter</h1>

      <FavoritesList />
    </main>
  );
}