import Link from "next/link";
import { stripTags } from "../assets/js/utils";
const Breadcrumb = ({ paths }) => {
  return (
    <ul className="breadcrumb">
      {paths &&
        paths.length > 0 &&
        paths.map(
          (item, index) =>
            item.name &&
            item.name !== "" && (
              <li key={index}>
                {item.url && item.url !== "" ? (
                  <Link href={stripTags(item.url)}>{stripTags(item.name)}</Link>
                ) : (
                  stripTags(item.name)
                )}
              </li>
            )
        )}
    </ul>
  );
};

export default Breadcrumb;
