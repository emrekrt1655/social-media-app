import { API_URL, apiRequest } from "./global/httpRequests";
import { CreateTopicData, Topic, TopicCreationResponse } from "../types/topics";

/**
 * Fetches all topics from the backend.
 * @returns {Promise<Topic[]>}
 */
export const getTopics = async (): Promise<Topic[]> => {
  const url = `${API_URL}/topics`;

  try {
    const topics = await apiRequest(url);
    return topics;
  } catch (error) {
    console.error("Error fetching topics:", error);
    throw new Error("Failed to fetch topics");
  }
};

/**
 * Create a new topic
 * @returns {Promise<TopicCreationResponse>}
 */
export const createTopic = async (
  data: CreateTopicData
): Promise<TopicCreationResponse> => {
  const url = `${API_URL}/topicCreate`;
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return { message: "Token not found" };
  }
  try {
    const result = await apiRequest(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Token: `${token}`,
      },
      body: JSON.stringify(data),
    });

    console.log("Topic created successfully:", result);
    return result;
  } catch (error) {
    console.error("Error creating topic:", error);
    return Promise.resolve({ message: "Error creating topic" });
  }
};
