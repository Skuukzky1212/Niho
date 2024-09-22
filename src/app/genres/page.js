import { Suspense } from "react";
import Breadcrumb from "../component/Breadcrumb";
import "../assets/css/blog.scss";
import Link from "next/link";

const BlogCate = async () => {
  try {
    const response = await fetch(
      `${process.env.API_STRAPI_URL}/api/infomation-categories?fields[0]=name`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from API");
    }

    const posts = await response.json();

    if (!posts.data) {
      throw new Error("No data available");
    }

    return (
      <>
        <ul className="lst-cate inner">
          {posts.data.length > 0
            ? posts.data.map((post) =>(<li key={post?.id} className="c-link01 is-udl"><Link href={'/genres/' + post?.id}><span>{post?.attributes.name}</span></Link></li>))
            : "No content founded!"}
        </ul>
      </>
    );
  } catch (error) {
    console.error("Fetch data error: ", error);
  }
};

export default function Genres() {
  return (
    <>
      <Breadcrumb
        paths={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: "Genres" },
        ]}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <BlogCate />
      </Suspense>
    </>
  );
};

