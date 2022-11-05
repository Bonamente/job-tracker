import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { FetchedJob } from '../../types';
import StyledJob from './StyledJob';
import JobInfo from '../job-info/JobInfo';
import { useAppDispatch } from '../../hooks/redux-toolkit-hooks';
import { deleteJob, setEditJob } from '../../features/job/jobSlice';

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
  const date = moment(createdAt).format('MMM Do, YYYY');

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
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
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
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => dispatch(deleteJob(_id))}
            >
              delete
            </button>
          </div>
        </footer>
      </div>
    </StyledJob>
  );
};

export default Job;
