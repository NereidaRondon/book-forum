import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });
      if (error) {
        console.error('Error fetching comments:', error);
      } else {
        setComments(data);
      }
    };
    fetchComments();
  }, [postId]);

  const addComment = async () => {
    if (newComment.trim()) {
      const { error } = await supabase
        .from('comments')
        .insert([{ post_id: postId, content: newComment }]);
      if (error) {
        console.error('Error adding comment:', error);
      } else {
        setNewComment('');
        const { data } = await supabase
          .from('comments')
          .select('*')
          .eq('post_id', postId)
          .order('created_at', { ascending: true });
        setComments(data);
      }
    }
  };

  return (
    <div className='comment-section'>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
      <textarea
        placeholder='Add a comment...'
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}></textarea>
      <button onClick={addComment}>Submit</button>
    </div>
  );
}

export default CommentSection;
