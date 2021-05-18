import Link from "next/link";

export default function page2() {
  return (
    <>
      <h1>ページ2</h1>
      <Link href="/">
        <a>Back to home</a>
      </Link>
    </>
  );
}
