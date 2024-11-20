import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null); // Track the comment being edited
  const [editedComment, setEditedComment] = useState(''); // Track the content of the comment being edited

  // Fetch comments
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

  // Add a new comment
  const addComment = async () => {
    if (newComment.trim()) {
      const { error } = await supabase
        .from('comments')
        .insert([{ post_id: postId, content: newComment }]);
      if (error) {
        console.error('Error adding comment:', error);
      } else {
        setNewComment('');
        refreshComments();
      }
    }
  };

  // Refresh comments
  const refreshComments = async () => {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
    setComments(data);
  };

  // Edit a comment
  const editComment = async (id) => {
    if (editedComment.trim()) {
      const { error } = await supabase
        .from('comments')
        .update({ content: editedComment })
        .eq('id', id);
      if (error) {
        console.error('Error editing comment:', error);
      } else {
        setEditingCommentId(null);
        setEditedComment('');
        refreshComments();
      }
    }
  };

  // Delete a comment
  const deleteComment = async (id) => {
    const { error } = await supabase.from('comments').delete().eq('id', id);
    if (error) {
      console.error('Error deleting comment:', error);
    } else {
      refreshComments();
    }
  };

  return (
    <div className='comment-section'>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li className='comment-list' key={comment.id}>
            {editingCommentId === comment.id ? (
              <div>
                <textarea
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}></textarea>
                <button className='comment-btn-save' onClick={() => editComment(comment.id)}>
                  Save
                </button>
                <button className='comment-btn-cancel' onClick={() => setEditingCommentId(null)}>
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                {comment.content}
                <div>
                  <button
                    className='comment-btn-edit'
                    onClick={() => {
                      setEditingCommentId(comment.id);
                      setEditedComment(comment.content);
                    }}>
                    Edit
                  </button>
                  <button className='comment-btn-delete' onClick={() => deleteComment(comment.id)}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <textarea
        placeholder='Add a comment...'
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}></textarea>
      <button className='comment-submit-btn' onClick={addComment}>
        Submit
      </button>
    </div>
  );
}

export default CommentSection;
