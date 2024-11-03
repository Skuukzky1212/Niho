import Link from "next/link";

const Pagination = ({ currentPage, lastPage }) => {
  return (
    <div className="pagination__controls">
      <Link
        href={currentPage - 1 !== 1 ? `?page=${currentPage - 1}` : '?'}
        className={`pagination__buttons prev ${
          currentPage <= 1 ? "disable" : ""
        }`}
      >
        Previous
      </Link>

      <Link
        href={`?page=${currentPage + 1}`}
        className={`pagination__buttons next ${
          currentPage >= lastPage ? "disable" : ""
        }`}
      >
        Next
      </Link>
    </div>
  );
};

export default Pagination;
