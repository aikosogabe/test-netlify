import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { getSortedPostsData } from "../lib/posts";
import { readContent } from "../lib/content";

export async function getStaticProps() {
  const contentData = readContent("home.md");
  console.log(contentData);

  return {
    props: {
      contentData,
    },
  };
}

export default function Home({ contentData }) {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>{contentData.data.site_name}</title>
          <link rel="icon" href="/favicon.ico" />
          <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>{contentData.data.site_name}</h1>
          <p>{contentData.data.site_description}</p>
          {/* <Link href="/posts/page1/">
            <a>page1</a>
          </Link>
          <Link href="/posts/page2/">
            <a>page2</a>
          </Link>
          <h2>Blog</h2>
          <ul>
            {contentData.map(({ id, date, title }) => (
              <li key={id}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                {id}
                <br />
                {date}
              </li>
            ))}
          </ul> */}
        </main>
        <footer className={styles.footer}>フッター</footer>
      </div>
    </>
  );
}
