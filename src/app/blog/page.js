import BlogItem from "../component/BlogItem";
import Breadcrumb from "../component/Breadcrumb";
import '../assets/css/blog.scss';

export default async function Blog() {
  const api_url = `${process?.env?.API_STRAPI_URL}/api/infomations?fields[0]=title&fields[1]=createdAt&populate[0]=thumb&populate[1]=infomation_categories`;
  let res = await fetch(api_url);
  let posts = await res.json();
  let blogList = posts?.data;

  return (
    <>
      <Breadcrumb />
      <div className="column-lst inner">
        {
          blogList ? (blogList.map((post)=>(
            <BlogItem key={post?.id} data={post} />
          ))) : 'No content founded!'
        }
      </div>
    </>
  )
}
