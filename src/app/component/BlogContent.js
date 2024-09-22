import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "./Breadcrumb";
import { formatMyDate } from "../assets/js/utils";

import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const BlogContent = ({ content }) => {
  const sgTitle = content?.attributes?.title;
  const sgTimestamp = content?.attributes?.createdAt;
  const sgTerm = content?.attributes?.information_categories?.data;
  const sgCmsContent = content?.attributes?.content;
  const strapi_url = process?.env?.API_STRAPI_URL;
  const sgThumb = content?.attributes?.thumb?.data?.attributes;
  const sgThumbCollect = {
    thumbUrl: strapi_url + sgThumb?.url || "/noimg.jpg", 
    thumbWidth: sgThumb?.width || "", 
    thumbHeight: sgThumb?.height || "", 
    thumbAlt: sgThumb?.alternativeText || "", 
  };
  return (
    <div className="sg-temp01">
      <div className="sg-info">
        <Breadcrumb
          paths={[
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog/" },
            { name: `${sgTitle}` },
          ]}
        />
        <div className="inner">
          <h1 className="sg-info__ttl">{sgTitle}</h1>
          <div className="sg-info__wrap">
            <span className="sg-info__date">{formatMyDate(sgTimestamp)}</span>
            <div className="sg-info__tag">
              {sgTerm?.length > 0 &&
                sgTerm.map((cat) => (
                  <Link key={cat?.id} href={`/genres/${cat?.id}`}>
                    #{cat?.attributes?.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="inner">
        <div className="mct">
          <div className="block01">
            <div className="thumb">
              <Image
                width={sgThumbCollect?.thumbWidth}
                height={sgThumbCollect?.thumbHeight}
                src={sgThumbCollect?.thumbUrl}
                alt={sgThumbCollect?.thumbAlt}
              />
            </div>
            <div className="cms-content">
              <BlocksRenderer content={sgCmsContent} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
