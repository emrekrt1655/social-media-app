export type Topic = CreateTopicData & {
    id: string;
    postCount: number;
  }
  
  export type CreateTopicData =  {
    text: string;
    topicUserId: string;
    country: string;
    image?: string;
  }
  
  export type TopicCreationResponse = {
    message: string;
  }

  export type TopicsResponse = {
      status: string,
      message: string,
      data: Topic[]
  }