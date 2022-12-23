import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'src/hooks/redux-hooks';
import { handleChange, clearFilters } from 'src/features/all-jobs/allJobsSlice';

import { AllJobsState, EventElement } from 'src/types';
import Input from 'src/components/input/Input';
import Select from 'src/components/select/Select';
import StyledSearchContainer from './StyledSearchContainer';

const SearchContainer = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [localSearch, setLocalSearch] = useState('');
  const { isLoading, searchStatus, searchType, sort, sortOptions } =
    useAppSelector((store) => store.allJobs);

  const { jobTypeOptions, statusOptions } = useAppSelector(
    (store) => store.job
  );

  const handleSearch = (e: React.SyntheticEvent) => {
    const target = e.target as EventElement;
    const name = target.name as keyof AllJobsState;
    const { value } = target;

    dispatch(handleChange({ name, value }));
  };

  const debounce = () => {
    let timeoutID: number;

    return (e: React.SyntheticEvent) => {
      const target = e.target as EventElement;
      const name = target.name as keyof AllJobsState;
      const { value } = target;

      setLocalSearch(value);
      clearTimeout(timeoutID);

      timeoutID = window.setTimeout(() => {
        dispatch(handleChange({ name, value }));
      }, 1000);
    };
  };

  const memoizedDebounce = useMemo(() => debounce(), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalSearch('');
    dispatch(clearFilters());
  };

  return (
    <StyledSearchContainer>
      <form className="form">
        <h2>{t('titles.search_form')}</h2>
        <div className="form-center">
          <Input
            type="text"
            name="search"
            value={localSearch}
            handleChange={memoizedDebounce}
          />

          <Select
            name="searchStatus"
            labelText="status"
            value={searchStatus}
            list={['all', ...statusOptions]}
            handleChange={handleSearch}
          />

          <Select
            name="searchType"
            labelText="type"
            value={searchType}
            list={['all', ...jobTypeOptions]}
            handleChange={handleSearch}
          />

          <Select
            name="sort"
            value={sort}
            list={sortOptions}
            handleChange={handleSearch}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            type="submit"
            onClick={handleSubmit}
          >
            {t('buttons.clear_filters')}
          </button>
        </div>
      </form>
    </StyledSearchContainer>
  );
};

export default SearchContainer;
