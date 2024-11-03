import Link from "next/link";

const SinglePagination = ({ pageName, prevPage, nextPage }) => {
  return (
    <div className="pagination__controls sg-pagenavi">
      <Link
        href={
          prevPage !== null ? `/${pageName}/${prevPage}/` : "#"
        }
        className={`pagination__buttons prev ${
          prevPage === null ? "disable" : ""
        }`}
      >
        Previous
      </Link>

      <Link href="/blog/" className="back-btn">
        Go back
      </Link>

      <Link
        href={
          nextPage !== null ? `/${pageName}/${nextPage}/` : "#"
        }
        className={`pagination__buttons next ${
          nextPage === null ? "disable" : ""
        }`}
      >
        Next
      </Link>
    </div>
  );
};

export default SinglePagination;
