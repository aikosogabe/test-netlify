import Link from "next/link";

export default function page1() {
  return (
    <>
      <h1>ページ1</h1>
      <Link href="/">
        <a>Back to home</a>
      </Link>
    </>
  );
}
