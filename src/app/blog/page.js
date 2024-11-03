import { Suspense } from "react";
import BlogItem from "../component/BlogItem";
import Breadcrumb from "../component/Breadcrumb";
import Pagination from "../component/Pagination";
import { notFound } from "next/navigation";

const BlogList = async ({ page, currentPage }) => {
  const PER_PAGE = 5;

  try {
    const response = await fetch(
      `${process.env.API_STRAPI_URL}/api/infomations?sort[0]=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${PER_PAGE}&fields[0]=title&fields[1]=updatedAt&populate[0]=thumb&populate[1]=information_categories`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from API");
    }

    const posts = await response.json();

    if (!posts.data) {
      throw new Error("No data available");
    }

    const { meta } = posts;
    const pagination = { meta };

    const lastPage = Math.ceil(meta.pagination.total / PER_PAGE) || 0;
    if (page > lastPage) notFound();

    return (
      <>
        {posts.data.length > 0 && (
          <>
            <div className="column-lst inner">
              {posts.data.map((post) => (
                <BlogItem key={post?.id} data={post} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              pagination={pagination}
              perpage={PER_PAGE}
              lastPage={lastPage}
            />
          </>
        )}
      </>
    );
  } catch (error) {
    console.error("Fetch data error: ", error);
    notFound();
  }
};

export default function Blog({ searchParams }) {
  const page = searchParams?.page || "1";
  const currentPage = +page;
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Breadcrumb
          paths={[
            { name: "Home", url: "/" },
            { name: "Blog", url: page !== "1" ? "/blog" : "" },
            { name: page !== "1" ? "Page " + page : "" },
          ]}
        />
        <BlogList page={page} currentPage={currentPage} />
      </Suspense>
    </>
  );
}
