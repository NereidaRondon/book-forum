import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function UpvoteButton({ postId, userId }) {
  const [hasUpvoted, setHasUpvoted] = useState(false);

  // Check if the user has already upvoted
  useEffect(() => {
    const checkUpvote = async () => {
      const { data, error } = await supabase
        .from('upvotes')
        .select('*')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .single();

      if (data) setHasUpvoted(true);
      if (error && error.code !== 'PGRST116') {
        console.error('Error checking upvote:', error);
      }
    };
    checkUpvote();
  }, [postId, userId]);

  const handleUpvote = async (postId) => {
    try {
      // Check if the user has already upvoted the post
      const { data: existingVote } = await supabase
        .from('upvotes')
        .select('*')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .single();

      if (existingVote) {
        alert('You have already upvoted this post.');
        return;
      }

      // Record the upvote in the `upvotes` table
      const { error: insertError } = await supabase
        .from('upvotes')
        .insert([{ post_id: postId, user_id: userId }]);

      if (insertError) {
        console.error('Error recording upvote:', insertError);
        return;
      }

      // Increment the upvotes count in the `posts` table
      const { error: updateError } = await supabase.rpc('increment_upvotes', { post_id: postId });

      if (updateError) {
        console.error('Error updating upvotes:', updateError);
        return;
      }

      // Update the local posts state to reflect the new upvote count
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
        )
      );
    } catch (error) {
      console.error('Error handling upvote:', error);
    }
  };

  return (
    <button
      onClick={handleUpvote}
      className={`upvote-button ${hasUpvoted ? 'disabled' : ''}`}
      disabled={hasUpvoted}>
      {hasUpvoted ? 'Upvoted' : 'Upvote'}
    </button>
  );
}

export default UpvoteButton;
