import { Suspense } from "react";
import BlogItem from "../component/BlogItem";
import Breadcrumb from "../component/Breadcrumb";
import "../assets/css/blog.scss";

const BlogList = async () => {
  try {
    const response = await fetch(
      `${process.env.API_STRAPI_URL}/api/infomations?fields[0]=title&fields[1]=createdAt&populate[0]=thumb&populate[1]=information_categories`
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
        <div className="column-lst inner">
          {posts.data.length > 0
            ? posts.data.map((post) => <BlogItem key={post?.id} data={post} />)
            : "No content founded!"}
        </div>
      </>
    );
  } catch (error) {
    console.error("Fetch data error: ", error);
  }
};

const Blog = () => {
  return (
    <>
      <Breadcrumb
        paths={[
          { name: "Home", url: "/" },
          { name: "Blog" },
        ]}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <BlogList />
      </Suspense>
    </>
  );
};

export default Blog;
