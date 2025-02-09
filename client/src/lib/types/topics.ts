export interface Topic extends CreateTopic{
    id: string;
    postCount: number;
  }
  
  export interface CreateTopic {
    text: string;
    topicUserId: string;
    country: string;
    image?: string;
  }