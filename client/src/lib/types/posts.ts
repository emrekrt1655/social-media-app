export type Post = PostCreateData & {
  postId: string;
  category: string;
  isElite: string;
  createdAt: string;
  updatedAt: string;
  _count: Count;
};

export type PostCreateData = {
  text: string;
  postUserId: string;
  postTopicId: string;
  image: string;
};

export type Count = {
  comments: number;
  likes: number;
};



export type PostCreationResponse = {
  message: string;
};

export type PostsResponse = {
    status: string,
    message: string,
    data: Post[]
}

export type PostDeleteResponse = PostCreationResponse & {};
