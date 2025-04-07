import { apiRequest } from "./global/httpRequests";
import {
  CreateTopicData,
  TopicsResponse,
  TopicCreationResponse,
} from "../types/topics";

//Fetches all topics from the backend.
export const getTopics = apiRequest<TopicsResponse>("/topics");

//Create a new topic
export const createTopic = (topic: CreateTopicData) =>
  apiRequest<TopicCreationResponse>("/topicCreate", "POST", topic);
