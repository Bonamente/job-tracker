import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

import StyledPagination from './StyledPagination';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import { changePage } from '../../features/all-jobs/allJobsSlice';

const Pagination = () => {
  const { numOfPages, page } = useAppSelector((store) => store.allJobs);
  const dispatch = useAppDispatch();

  const pages = Array.from({ length: numOfPages }, (_, idx) => idx + 1);

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }

    dispatch(changePage(newPage));
  };

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }

    dispatch(changePage(newPage));
  };

  return (
    <StyledPagination>
      <h3 className="visually-hidden">Pagination</h3>
      <button className="prev-btn" type="button" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
            aria-label={`Go to page ${pageNumber}`}
            type="button"
            onClick={() => dispatch(changePage(pageNumber))}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button className="next-btn" type="button" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </StyledPagination>
  );
};

export default Pagination;
