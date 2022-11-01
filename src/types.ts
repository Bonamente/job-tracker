export type User = {
  name?: string;
  email: string;
  password: string;
};

export type FetchedUser = {
  email: string;
  name: string;
  lastName: string;
  location: string;
  token?: string;
};

export type UserData = {
  user: FetchedUser;
};

export type CustomFetchError = {
  response: {
    data: {
      msg: string;
    };
  };
};

export type UserState = {
  isLoading: boolean;
  isSidebarOpen: boolean;
  user: null | FetchedUser;
};

export type JobState = {
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

export type Job = {
  position: string;
  company: string;
  jobLocation: string;
  jobType: string;
  status: string;
};

export type FetchedJob = {
  _id: string;
  company: string;
  createdAt: string;
  jobLocation: string;
  jobType: string;
  position: string;
  status: string;
};

export type SortOptions = ['latest', 'oldest', 'a-z', 'z-a'];

export type FiltersState = {
  search: string;
  searchStatus: string;
  searchType: string;
  sort: string;
  sortOptions: SortOptions;
};

export type AllJobsState = {
  isLoading: boolean;
  jobs: FetchedJob[] | [];
  totalJobs: number;
  numOfPages: number;
  page: number;
} & FiltersState;

export type State = {
  user: UserState;
  job: JobState;
  allJobs: AllJobsState;
};
