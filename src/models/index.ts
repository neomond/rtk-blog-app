export type BlogItems = {
  blogSlice: any;
  id?: string;
  createdAt: string;
  title?: string;
  avatar?: string;
  description?: string;
};

export type TabParamList = {
  Home: undefined | any;
  Settings: undefined;
};

export type StackParamList = {
  Blogs: undefined;
  BlogDetails: {blogId: string};
};
