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

export type State = {
  user: UserState;
};
