import BlogItem from "@/app/component/BlogItem";
import Breadcrumb from "@/app/component/Breadcrumb";
import { notFound } from "next/navigation";

// get blog path single
export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.API_STRAPI_URL}/api/infomation-categories/?fields[0]=id`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data from API");
    }
    const terms = await response.json();
    if (!terms.data) {
      throw new Error("No data available");
    }

    return terms.data.map((term) => ({
      genre_id: String(term.id),
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// fetch data from blog id
async function getTerm(id) {
  const response = await fetch(
    `${process.env.API_STRAPI_URL}/api/infomation-categories/${String(
      id
    )}/?fields[0]=name&populate[0]=informationcat.thumb&populate[1]=informationcat.information_categories`
  );
  const term = await response.json();
  if (!term) notFound();
  return term;
}

export default async function Genre({ params }) {
  const { genre_id } = params;

  let term = await getTerm(genre_id);
  if (!term.data) notFound();
  let posts = term?.data?.attributes?.informationcat?.data;
  let currTermName = term?.data?.attributes?.name;
  return (
    <>
     <Breadcrumb
        paths={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: "Genres", url: "/genres" },
          { name: currTermName },
        ]}
      />
      <div className="column-lst inner">
        {posts.length > 0
          ? posts.map((post) => <BlogItem key={post?.id} data={post} />)
          : "No content founded!"}
      </div>
    </>
  );
}
