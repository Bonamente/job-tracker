import StyledJobInfo from './StyledJobInfo';

type JobInfoProps = {
  icon: JSX.Element;
  text: string;
};

const JobInfo: React.FC<JobInfoProps> = ({ icon, text }) => (
  <StyledJobInfo>
    <span className="icon">{icon}</span>
    <span className="text">{text}</span>
  </StyledJobInfo>
);

export default JobInfo;
