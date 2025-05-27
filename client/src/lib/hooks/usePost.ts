import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPosts,
  getUserPosts,
  createPost,
  deletePost,
} from "../rest/postsService";
import { PostCreateData, PostsResponse, Post } from "../types/posts";

/**
 * Fetches all posts
 */

export function usePosts(userId?: string) {
  const { data, ...queryResult } = useQuery<PostsResponse>({
    queryKey: userId ? ["userPosts", userId] : ["posts"],
    queryFn: () => (userId ? getUserPosts(userId) : getPosts()),
    retry: false,
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
  });

  return {
    posts: data?.data ? data.data : ([] as Post[]),
    ...queryResult,
  };
}

/**
 * Handles post creation and deletion mutations
 */

export function usePostMutations(userId: string) {
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: async (newPost: PostCreateData) => await createPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["userPosts", userId] });
      }
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (postId: string) => await deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["userPosts", userId] });
      }
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
    },
  });

  return {
    createPost: createPostMutation.mutate,
    deletePost: deletePostMutation.mutate,
  };
}
