import Image from "next/image";
import Link from "next/link";
import { formatMyDate } from "../assets/js/utils"; 
const BlogItem = ({ data }) => {
  const strapi_url = process?.env?.API_STRAPI_URL
  const title = data?.attributes?.title || '';
  const term = data?.attributes?.infomation_categories?.data || [];
  const thumb = data?.attributes?.thumb?.data?.attributes?.url;
  const thumb_url = thumb ? strapi_url + thumb : '/noimg.jpg';
  const timestamp = data?.attributes?.createdAt || '';
  return (
    <Link className="item" href={`/blog/${data?.id}`}>
      <p className="item__photo">
        <Image
          width={352}
          height={209}
          src={thumb_url}
          alt=""
        />
      </p>
      <span className="item__info">
        <small className="item__info--date">{formatMyDate(timestamp)}</small>
        {term && term.map((cat)=>(
          <small key={cat?.id} className="item__info--cate">{cat?.attributes?.name}</small>
        ))}
      </span>
      <h2 className="item__ttl">{title}</h2>
    </Link>
  );
};

export default BlogItem;
