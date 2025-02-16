export type Follower = CreateFollowerData & {
  folId: string;
  createdAt: string;
  updatedAt: string;
};

export type FollowersResponse = {
  status: string;
  message: string;
  data: Follower[];
};

export type CreateFollowersResponse = {
  message: string;
};

export type DeleteFollowersResponse = CreateFollowersResponse & {};

export type CreateFollowerData = {
  followerId: string;
  followedId: string;
};
