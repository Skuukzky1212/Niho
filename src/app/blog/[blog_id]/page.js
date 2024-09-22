import BlogContent from "@/app/component/BlogContent";
import { notFound } from "next/navigation";

// get blog path single
export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.API_STRAPI_URL}/api/infomations/?populate=*`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data from API");
    }
    const posts = await response.json();
    if (!posts.data) {
      throw new Error("No data available");
    }
    return posts.data.map((post) => ({
      blog_id: String(post.id),
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// dynamic meta
export async function generateMetadata({ params }) {
  const { blog_id } = params;
  let post = await getPost(blog_id);
  return {
    title: post?.data?.attributes?.title,
  };
}

// fetch data from blog id
async function getPost(id) {
  const response = await fetch(
    `${process.env.API_STRAPI_URL}/api/infomations/${String(id)}/?populate[0]=thumb&populate[1]=information_categories`
  );
  const post = await response.json();
  if (!post) notFound();
  return post;
}

export default async function BlogSingle({ params }) {
  const { blog_id } = params;
  let post = await getPost(blog_id);
  if (!post.data) notFound();
  return (
    <>
      <BlogContent content={post.data} />
    </>
  );
}
