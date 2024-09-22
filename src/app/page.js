import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/logo.svg"
          alt="Next.js Logo"
          width={200}
          height={200}
          priority
        />
      </div>
      <div className={styles.grid}>
        <Link
          href="/blog"
          className={styles.card}
        >
          <h2>
            Nihon Blog <span>&gt;</span>
          </h2>
          <p>Find in-depth information about Nihon here!</p>
        </Link>
      </div>
    </main>
  );
}
