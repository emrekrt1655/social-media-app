import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createFollower,
  deleteFollower,
  getFollowers,
} from "../rest/followersService";
import { CreateFollowerData, FollowersResponse } from "../types/follower";

/**
 * Fetches all followers
 */

export function useFollowers() {
  const { data, ...queryResult } = useQuery<FollowersResponse>({
    queryKey: ["followers"],
    queryFn: getFollowers,
    retry: false,
  });

  return {
    followers: data?.data ? data.data : [],
    ...queryResult,
  };
}

/**
 * Handles follower creation and deletion mutations.
 */

export function useFollowersMutation() {
  const queryClient = useQueryClient();

  const createFollowerMuttation = useMutation({
    mutationFn: async (newFollower: CreateFollowerData) =>
      await createFollower(newFollower),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followers"] });
    },
    onError: (error) => {
      console.error("Error creating follower:", error);
    },
  });

  const deleteFollowerMuttation = useMutation({
    mutationFn: async (folId: string) => await deleteFollower(folId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followers"] });
    },
    onError: (error) => {
      console.error("Error deleting follower:", error);
    },
  });

  return {
    createFollower: createFollowerMuttation.mutate,
    deleteFollower: deleteFollowerMuttation.mutate,
  };
}
