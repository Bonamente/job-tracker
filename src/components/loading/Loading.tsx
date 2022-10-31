type LoadingProps = {
  center?: boolean;
};

const Loading: React.FC<LoadingProps> = ({ center }) => (
  <div className={center ? 'loading loading-center' : 'loading'} />
);

export default Loading;
