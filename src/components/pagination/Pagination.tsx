import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

import { useAppSelector, useAppDispatch } from 'src/hooks/redux-hooks';
import { changePage } from 'src/features/all-jobs/allJobsSlice';
import StyledPagination from './StyledPagination';

const Pagination = () => {
  const { numOfPages, page } = useAppSelector((store) => store.allJobs);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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
      <h3 className="visually-hidden">{t('titles.pagination')}</h3>
      <button className="prev-btn" type="button" onClick={prevPage}>
        <HiChevronDoubleLeft />
        {t('buttons.prev')}
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
            aria-label={`${t('buttons.go_to')} ${pageNumber}`}
            onClick={() => dispatch(changePage(pageNumber))}
            type="button"
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button className="next-btn" type="button" onClick={nextPage}>
        {t('buttons.next')}
        <HiChevronDoubleRight />
      </button>
    </StyledPagination>
  );
};

export default Pagination;
