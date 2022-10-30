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

export type State = {
  user: UserState;
};
