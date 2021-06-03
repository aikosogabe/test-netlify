import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { readAllArticleContents, readContent } from "../lib/content";
import { formatDate } from "../lib/date";
import { NextSeo } from "next-seo";

export async function getStaticProps() {
  const homeContentData = readContent("home.md");
  const allBlogData = readAllArticleContents("blog");
  return {
    props: {
      homeContentData,
      allBlogData,
    },
  };
}

export default function Home({ homeContentData, allBlogData }) {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        </Head>
        <NextSeo
          title={homeContentData.data.site_name}
          description={homeContentData.data.description}
          openGraph={{
            type: "website",
            title: homeContentData.data.site_name,
            description: homeContentData.data.description,
            url: `https://brave-lalande-0e6115.netlify.app`,
            images: [
              {
                url: `https://brave-lalande-0e6115.netlify.app/images/upload/1200x900.png`,
              },
            ],
          }}
        />

        <main className={styles.main}>
          <h1 className={styles.title}>{homeContentData.data.site_name}</h1>
          <p>{homeContentData.data.site_description}</p>
          <h2>Blog</h2>
          <ul>
            {allBlogData.map(({ data }) => (
              <li key={data.id}>
                <Link href={`/posts/${data.id}`}>
                  <a>{data.title}</a>
                </Link>
                <br />
                {formatDate(data.date)}
              </li>
            ))}
          </ul>
        </main>
        <footer className={styles.footer}>フッター</footer>
      </div>
    </>
  );
}
