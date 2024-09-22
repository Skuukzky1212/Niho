import Link from "next/link";
import { stripTags } from "../assets/js/utils";
const Breadcrumb = ({ paths }) => {
  return (
    <ul className="breadcrumb">
      {paths && paths.length > 0 &&
        paths.map((item, index) => (
          <li key={index}>
            {index < paths.length - 1 ? (
              <Link href={stripTags(item.url)}>{stripTags(item.name)}</Link>
            ) : (
              stripTags(item.name)
            )}
          </li>
        ))
      }
    </ul>
  );
};

export default Breadcrumb;
