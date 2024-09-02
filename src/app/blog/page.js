import BlogItem from "../component/BlogItem"
import Breadcrumb from "../component/Breadcrumb"
import '../assets/blog.scss'

const Blog = () => {
  return (
    <>
      <Breadcrumb />
      <div className="column-lst inner">
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
      </div>
    </>
  )
}

export default Blog