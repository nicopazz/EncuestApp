import { Pagination } from "react-bootstrap";
import propTypes from "prop-types";

// eslint-disable-next-line react/prop-types
export const ABMPagination = ({ page, handlePageChange, data }) => {
  // eslint-disable-next-line react/prop-types
  const { totalPages, currentPage } = data;
  return (
    <>
      <Pagination className="mt-5 justify-content-center">
        <Pagination.Prev
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        />
        <Pagination.Item active>{currentPage}</Pagination.Item>
        <Pagination.Next
          onClick={() => handlePageChange(page + 1)}
          // eslint-disable-next-line react/prop-types
          disabled={page === totalPages || totalPages === 0 ? true : false}
        />
      </Pagination>
    </>
  );
};

ABMPagination.propTypes = {
  page: propTypes.number.isRequired,
  handlePageChange: propTypes.func.isRequired,
};
