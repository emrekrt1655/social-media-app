import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTopics, createTopic } from "../rest/topicsService";
import { CreateTopicData, TopicsResponse, Topic } from "../types/topics";

/**
 * Fetches all topics from the backend.
 */
export function useTopics() {
  const { data, ...queryResult } = useQuery<TopicsResponse>({
    queryKey: ["topics"],
    queryFn: () => getTopics,
    retry: false,
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
  });

  return {
    topics: data?.data ? data?.data : ([] as Topic[]),
    ...queryResult,
  };
}

/**
 * Handles topic creation mutation.
 */
export function useCreateTopic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTopic: CreateTopicData) =>
      await createTopic(newTopic),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
    onError: (error) => {
      console.error("Error creating topic:", error);
    },
  });
}
