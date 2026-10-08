/** Static pagination control (the theme has no real paging yet). */
const Pagination = ({ className = "page-nav-wrap mt-5 text-center" }: { className?: string }) => (
  <nav className={className} aria-label="Pagination">
    <ul>
      <li>
        <a className="page-numbers" href="#" aria-label="Previous page">
          <i className="fal fa-long-arrow-left" />
        </a>
      </li>
      {["01", "02", "..", "10", "11"].map((page) => (
        <li key={page}>
          <a className="page-numbers" href="#">
            {page}
          </a>
        </li>
      ))}
      <li>
        <a className="page-numbers" href="#" aria-label="Next page">
          <i className="fal fa-long-arrow-right" />
        </a>
      </li>
    </ul>
  </nav>
);

export default Pagination;
