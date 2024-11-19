import { supabase } from './supabase';

// Fetch all posts
export const fetchPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
  return data;
};

// Fetch a single post by ID
export const fetchPostById = async (id) => {
  const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();

  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }
  return data;
};

// Create a new post
export const createPost = async (post) => {
  const { error } = await supabase.from('posts').insert([post]);

  if (error) {
    console.error('Error creating post:', error);
    return false;
  }
  return true;
};

// Update a post
export const updatePost = async (id, updates) => {
  const { error } = await supabase.from('posts').update(updates).eq('id', id);

  if (error) {
    console.error('Error updating post:', error);
    return false;
  }
  return true;
};

// Delete a post
export const deletePost = async (id) => {
  const { error } = await supabase.from('posts').delete().eq('id', id);

  if (error) {
    console.error('Error deleting post:', error);
    return false;
  }
  return true;
};
