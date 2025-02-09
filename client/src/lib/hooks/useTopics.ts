import { useMutation, useQuery } from '@tanstack/react-query';
import { getTopics } from '../rest/topics';
import { queryClient } from '../../config/reactQueryConfig';
import { Topic } from '../types/topics';


export function useTopics() {
    const queryResult = useQuery<Topic[]>({
      queryKey: ['topics'],
      queryFn: async ({ signal }) => (await getTopics()) as Topic[],
      retry: false,
    });
  
    const topics = queryResult.data ?? [];
    console.log(topics)
    return {
      ...queryResult,
      topics,
    };
  }