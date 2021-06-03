import { GetStaticPropsContext } from "next";
import Link from "next/link";
import remark from "remark";
import html from "remark-html";
import path from "path";
import Layout from "../../components/layout";
import { readAllArticleContents, readContent } from "../../lib/content";
import { createHeaderImageData } from "../../lib/createHeaderImageData";
import { formatDate } from "../../lib/date";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

type Params = { id: string };

export default function Post({ contentHtml, data }) {
  const router = useRouter();
  return (
    <>
      <NextSeo
        title={data.title}
        description={data.description}
        openGraph={{
          type: "article",
          article: {
            authors: ["aikosogabe"],
            tags: ["test", "blog"],
          },
          title: data.title,
          description: data.description,
          url: `https://brave-lalande-0e6115.netlify.app${router.asPath}`,
          images: [
            {
              url: `https://brave-lalande-0e6115.netlify.app${data.image}`,
            },
          ],
        }}
      />
      <Layout>
        <h1>{data.title}</h1>
        <p>{formatDate(data.date)}</p>
        <div>
          {/* <picture>
            {imageUrls.srcSetWebp && (
              <source srcSet={imageUrls.srcSetWebp} type="image/webp" />
            )}
            {imageUrls.srcSetWebpMobile && (
              <source
                srcSet={imageUrls.srcSetWebpMobile}
                type="image/webp"
                media="(max-width: 768px)"
              />
            )}

            <source srcSet={imageUrls.srcSet} />
            {imageUrls.srcSetMobile && (
              <source
                srcSet={imageUrls.srcSetMobile}
                media="(max-width: 768px)"
              />
            )}

            <img
              src={imageUrls.srcSet}
              alt={imageUrls.altText ? imageUrls.altText : ""}
            />
          </picture> */}
        </div>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
        <Link href="/">
          <a>← Back to home</a>
        </Link>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const articles = readAllArticleContents("blog");
  const paths = articles.map(({ data }) => {
    return { params: { id: data.id } };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<Params>) {
  const { content, data } = readContent(path.join("blog", `${params.id}.md`));
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  // const imageUrls = await createHeaderImageData(data.image, data.image_sp);

  return {
    props: { contentHtml, data },
  };
}
