import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import { FetchedJob } from 'src/types';
import JobInfo from 'src/components/job-info/JobInfo';
import { useAppDispatch } from 'src/hooks/redux-hooks';
import { setEditJob } from 'src/features/job/jobSlice';
import { deleteJob } from 'src/features/job/jobThunks';
import StyledJob from './StyledJob';

const Job: React.FC<FetchedJob> = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}) => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const curLang = i18n.language;
  let date;

  if (curLang === 'ru') {
    date = dayjs(createdAt).locale('ru').format('D MMMM YYYY');
  } else {
    date = dayjs(createdAt).format('MMMM D, YYYY');
  }

  return (
    <StyledJob>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h3>{position}</h3>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={t(`job_type.${jobType}`)} />
          <div className={`status ${status}`}>{t(`status_type.${status}`)}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              className="btn edit-btn"
              to="/add-job"
              onClick={() =>
                dispatch(
                  setEditJob({
                    editJobId: _id,
                    position,
                    company,
                    jobLocation,
                    jobType,
                    status,
                  })
                )
              }
            >
              {t('buttons.edit')}
            </Link>
            <button
              className="btn delete-btn"
              onClick={() => dispatch(deleteJob(_id))}
              type="button"
            >
              {t('buttons.delete')}
            </button>
          </div>
        </footer>
      </div>
    </StyledJob>
  );
};

export default Job;
