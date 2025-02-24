import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  unlike,
  likePost,
  likeComment,
  getLikes,
  getCommentLikes,
  getPostLikes,
} from "../rest/likeService";
import {
  LikeResponse,
  CreateLikeCommentData,
  CreateLikePostData,
} from "../types/like";

/**
 * Fetches all likes
 */

export function useLikes() {
  const getAllLikes = () => {
    const { data, ...queryResult } = useQuery<LikeResponse>({
      queryKey: ["likes"],
      queryFn: getLikes,
      retry: false,
    });

    return {
      likes: data?.data ? data.data : [],
      ...queryResult,
    };
  };

  const getAllPostLikes = (postId: string) => {
    const { data, ...queryResult } = useQuery<LikeResponse>({
      queryKey: ["postLikes", postId],
      queryFn: () => getPostLikes(postId),
      retry: false,
    });

    return {
      postLikes: data?.data ? data.data : [],
      ...queryResult,
    };
  };

  const getAllCommentLikes = (commentId: string) => {
    const { data, ...queryResult } = useQuery<LikeResponse>({
      queryKey: ["commentLikes", commentId],
      queryFn: () => getCommentLikes(commentId),
      retry: false,
    });

    return {
      commentLikes: data?.data ? data.data : [],
      ...queryResult,
    };
  };

  return {
    getAllLikes,
    getAllPostLikes,
    getAllCommentLikes,
  };
}

export function useLikeMutation() {
  const queryClient = useQueryClient();

  const likePostMutation = useMutation({
    mutationFn: async (like: CreateLikePostData) => await likePost(like),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["postLikes", variables.likePostId] });
    },
    onError: (error) => {
      console.error("Error creating like:", error);
    },
  });

  const likeCommentMutation = useMutation({
    mutationFn: async (like: CreateLikeCommentData) => await likeComment(like),
    onSuccess: (_, variables) => {
        console.log("Mutation success! Invalidating query for:", variables.likeCommentId);
      queryClient.invalidateQueries({ queryKey: ['commentLikes', variables.likeCommentId] });
    },
    onError: (error) => {
      console.error("Error creating like:", error);
    },
  });

  const deleteLike = useMutation({
    mutationFn: async (likeId: string) => await unlike(likeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postLikes"] });
      queryClient.invalidateQueries({ queryKey: ["commentLikes"] });
    },
    onError: (error) => {
      console.error("Error deleting like:", error);
    },
  });

  return {
    likePost: likePostMutation.mutate,
    likeComment: likeCommentMutation.mutate,
    deleteLike: deleteLike.mutate,
  };
}
