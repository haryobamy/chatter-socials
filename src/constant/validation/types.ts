export type ILogin = {
  email: string;
  password: string;
};

export type ISignUp = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  role: string;
  username: string;
};

export type IcreateFeeds = {
  content: string;
  title: string;
  image: any;
};
