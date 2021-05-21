import { GetStaticPropsContext } from "next";
import Link from "next/link";
import remark from "remark";
import html from "remark-html";
import path from "path";
import Layout from "../../components/layout";
import { readAllArticleContents, readContent } from "../../lib/content";
import { formatDate } from "../../lib/date";

type Params = { id: string };

export default function Post({ contentHtml, data }) {
  return (
    <Layout>
      {data.title}
      <br />
      {data.id}
      <br />
      {formatDate(data.date)}
      <br />
      <div dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
      <br />
      <Link href="/">
        <a>Back to home</a>
      </Link>
    </Layout>
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
  return {
    props: { contentHtml, data },
  };
}
