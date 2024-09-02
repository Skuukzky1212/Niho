/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
const BlogItem = () => {
  return (
    <Link
      class="item"
      href="#"
    >
      <p class="item__photo">
        <img
          width="352"
          height="209"
          src="https://dummyimage.com/352x209/000/fff"
          alt=""
        />
      </p>
      <span class="item__info">
        <small class="item__info--date">2024.08.08</small>
        <small class="item__info--cate">カテゴリ名</small>
      </span>
      <h2 class="item__ttl">【危険】事故を起こした インプラント</h2>
    </Link>
  );
};

export default BlogItem;
