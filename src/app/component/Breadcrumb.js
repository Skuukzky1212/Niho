"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Breadcrumb = () => {
  const pathname = usePathname();
  let pathname_arr = pathname?.split("/").filter((item) => item !== "");
  const formatString = (str) => {
    return str.replace(/-/g, " ").replace(/^\w/, (char) => char.toUpperCase());
  };
  return (
    <ul className="breadcrumb">
      <li>
        <Link href={"/"}>Home</Link>
      </li>
      {pathname_arr &&
        pathname_arr.map((item, index) => (
          <li key={index}>
            <Link href={`/${pathname_arr.slice(0, index + 1).join("/")}`}>
              {formatString(item)}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default Breadcrumb;
