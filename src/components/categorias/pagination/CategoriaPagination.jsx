/* eslint-disable react/prop-types */
import { Pagination } from "react-bootstrap";
import propTypes from "prop-types";

export const CategoriaPagination = ({ page, handlePageChange, data }) => {
  return (
    <>
      <Pagination className="mt-5 justify-content-center">
        <Pagination.Prev
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        />
        <Pagination.Item active>{data?.currentPage}</Pagination.Item>
        <Pagination.Next
          onClick={() => handlePageChange(page + 1)}
          // eslint-disable-next-line react/prop-types
          disabled={
            page === data?.totalPages || data?.totalPages === 0 ? true : false
          }
        />
      </Pagination>
    </>
  );
};

CategoriaPagination.propTypes = {
  page: propTypes.number.isRequired,
  handlePageChange: propTypes.func.isRequired,
};
