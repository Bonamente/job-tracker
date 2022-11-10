type EventElement = HTMLInputElement | HTMLSelectElement;

type User = {
  name?: string;
  email: string;
  password: string;
};

type FetchedUser = {
  email: string;
  name: string;
  lastName: string;
  location: string;
  token?: string;
};

type UserData = {
  user: FetchedUser;
};

type CustomFetchError = {
  response: {
    data: {
      msg: string;
    };
  };
};

type UserState = {
  isLoading: boolean;
  isSidebarOpen: boolean;
  user: null | FetchedUser;
};

type JobState = {
  isLoading: boolean;
  position: string;
  company: string;
  jobLocation: string;
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'];
  jobType: string;
  statusOptions: ['interview', 'declined', 'pending'];
  status: string;
  isEditing: boolean;
  editJobId: string;
};

type Job = {
  position: string;
  company: string;
  jobLocation: string;
  jobType: string;
  status: string;
};

type FetchedJob = {
  _id: string;
  company: string;
  createdAt: string;
  jobLocation: string;
  jobType: string;
  position: string;
  status: string;
};

type SortOptions = ['latest', 'oldest', 'a-z', 'z-a'];

type FiltersState = {
  search: string;
  searchStatus: string;
  searchType: string;
  sort: string;
  sortOptions: SortOptions;
};

type Application = {
  date: string;
  count: number;
};

type Stats = { pending: number; interview: number; declined: number };

type FetchedStats = {
  defaultStats: Stats;
  monthlyApplications: Application[] | [];
};

type AllJobsState = {
  isLoading: boolean;
  jobs: FetchedJob[] | [];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: Stats | Record<string, number>;
  monthlyApplications: Application[] | [];
} & FiltersState;

type State = {
  user: UserState;
  job: JobState;
  allJobs: AllJobsState;
};

export type {
  EventElement,
  User,
  FetchedUser,
  UserData,
  CustomFetchError,
  UserState,
  JobState,
  Job,
  FetchedJob,
  SortOptions,
  FiltersState,
  Application,
  Stats,
  FetchedStats,
  AllJobsState,
  State,
};
