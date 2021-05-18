import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>HOME</h1>
        <Link href="/posts/page1/">
          <a>page1</a>
        </Link>
        <Link href="/posts/page2/">
          <a>page2</a>
        </Link>
      </main>
      <footer className={styles.footer}>フッター</footer>
    </div>
  );
}
