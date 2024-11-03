import BlogContent from "@/app/component/BlogContent";
import SinglePagination from "@/app/component/SinglePagination";
import { notFound } from "next/navigation";

// get blog path single
export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.API_STRAPI_URL}/api/infomations/?fields[0]=id`
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
    `${process.env.API_STRAPI_URL}/api/infomations/${String(
      id
    )}/?populate[0]=thumb&populate[1]=information_categories`
  );
  const post = await response.json();
  if (!post) notFound();
  return post;
}

export default async function BlogSingle({ params }) {
  const { blog_id } = params;
  let post = await getPost(blog_id);
  if (!post.data) notFound();

  // Fetch next and previous posts
  const curPublishedAt = post.data.attributes.publishedAt;

  const previousUrl = new URL(`${process.env.API_STRAPI_URL}/api/infomations`);
  previousUrl.searchParams.append("filters[publishedAt][$gt]", curPublishedAt);
  previousUrl.searchParams.append("sort[0]", "publishedAt:asc");
  previousUrl.searchParams.append("pagination[start]", "0");
  previousUrl.searchParams.append("pagination[limit]", "1");

  const nextUrl = new URL(`${process.env.API_STRAPI_URL}/api/infomations`);
  nextUrl.searchParams.append("filters[publishedAt][$lt]", curPublishedAt);
  nextUrl.searchParams.append("sort[0]", "publishedAt:desc");
  nextUrl.searchParams.append("pagination[start]", "0");
  nextUrl.searchParams.append("pagination[limit]", "1");

  const previousRes = await fetch(previousUrl);
  const nextRes = await fetch(nextUrl);
  const prevPost = await previousRes.json() || null;
  const nextPost = await nextRes.json() || null;
  return (
    <>
      <BlogContent content={post.data} />
      <SinglePagination
        pageName="blog"
        prevPage={prevPost?.data[0]?.id || null}
        nextPage={nextPost?.data[0]?.id || null}
      />
    </>
  );
}
