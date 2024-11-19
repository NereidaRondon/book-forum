import { supabase } from './supabase';

// Fetch comments for a specific post
export const fetchCommentsByPostId = async (postId) => {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
  return data;
};

// Add a new comment
export const addComment = async (comment) => {
  const { error } = await supabase.from('comments').insert([comment]);

  if (error) {
    console.error('Error adding comment:', error);
    return false;
  }
  return true;
};

// Delete a comment
export const deleteComment = async (id) => {
  const { error } = await supabase.from('comments').delete().eq('id', id);

  if (error) {
    console.error('Error deleting comment:', error);
    return false;
  }
  return true;
};
