import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTopics, createTopic } from "../rest/topicsService";
import { CreateTopicData, Topic } from "../types/topics";

/**
 * Fetches all topics from the backend.
 */
export function useTopics() {
  const { data: topics = [], ...queryResult } = useQuery<Topic[]>({
    queryKey: ["topics"],
    queryFn: getTopics,
    retry: false,
  });

  return {
    topics,
    ...queryResult,
  };
}

/**
 * Handles topic creation mutation.
 */
export function useCreateTopic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTopic: CreateTopicData) => await createTopic(newTopic),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
    onError: (error) => {
      console.error("Error creating topic:", error);
    },
  });
}
