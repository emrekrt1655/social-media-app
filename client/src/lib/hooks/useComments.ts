import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getComments,
  createComment,
  deleteComment,
} from "../rest/commentsService";
import { CommentCreateData, CommentsResponse, Comment } from "../types/comment";

/**
 * Fetches all comments for a post
 */

export function useComments(postId: string) {
  const { data, ...queryResult } = useQuery<CommentsResponse>({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
    retry: false,
  });

  return {
    comments: data?.data ? data.data : ([] as Comment[]),
    ...queryResult,
  };
}

/**
 * Handles comment creation and deletion mutations.
 */
export function useCommentMutations(postId: string) {
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation({
    mutationFn: async (newComment: CommentCreateData) =>
      await createComment(newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (error) => {
      console.error("Error creating comment:", error);
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: string) => await deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (error) => {
      console.error("Error deleting comment:", error);
    },
  });

  return {
    createComment: createCommentMutation.mutate,
    deleteComment: deleteCommentMutation.mutate,
  };
}
