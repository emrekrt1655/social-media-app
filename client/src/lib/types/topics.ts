export type Topic = CreateTopicData & {
  topicId: string;
  image?: string;
  country: string;
  category?: string;
  isElite?: string;
  createdAt: string;
  updatetAt: string;
  _count: {
    posts: number;
  };
};

export type CreateTopicData = {
  text: string;
  topicUserId: string;
  country: string;
  image?: string;
};

export type TopicCreationResponse = {
  message: string;
};

export type TopicsResponse = {
  status: string;
  message: string;
  data: Topic[];
};

export type FilterType = "mostRated" | "lastAdded" | "countryTopic";
