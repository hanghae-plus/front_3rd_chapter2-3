type ResUser = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};

type User = {
  id: number;
  username: string;
  image: string;
};
