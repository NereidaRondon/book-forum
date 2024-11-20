import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useParams, useNavigate } from 'react-router-dom';
import UpvoteButton from '../components/UpvoteButton';
import CommentSection from '../components/CommentSection';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editedImageUrl, setEditedImageUrl] = useState('');

  // Fetch the post details
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setPost(data);
        setEditedTitle(data.title);
        setEditedContent(data.content);
        setEditedImageUrl(data.image_url || '');
      }
    };
    fetchPost();
  }, [id]);

  // Update the post in the database
  const savePost = async () => {
    const { error } = await supabase
      .from('posts')
      .update({ title: editedTitle, content: editedContent })
      .eq('id', id);
    if (error) {
      console.error('Error updating post:', error);
    } else {
      setPost((prevPost) => ({
        ...prevPost,
        title: editedTitle,
        content: editedContent,
        image_url: editedImageUrl,
      }));
      setIsEditing(false); // Exit edit mode
    }
  };

  // Delete the post
  const deletePost = async () => {
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) {
      console.error('Error deleting post:', error);
    } else {
      navigate('/'); // Redirect to homepage after deletion
    }
  };

  const updateUpvoteCount = (newUpvoteCount) => {
    setPost((prevPost) => ({ ...prevPost, upvotes: newUpvoteCount }));
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className='post-detail'>
      {isEditing ? (
        <div className='post-edit'>
          <label>Title:</label>
          <input
            type='text'
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className='edit-input'
          />
          <label>Content:</label>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className='edit-textarea'></textarea>

          <label>Image URL (optional):</label>
          <input
            type='text'
            value={editedImageUrl}
            onChange={(e) => setEditedImageUrl(e.target.value)}
            className='edit-input'
            placeholder='Image URL (optional)'
          />
          <br />
          <button className='save-button' onClick={savePost}>
            Save
          </button>
          <button className='cancel-button' onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className=''>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {post.image_url && (
              <img src={post.image_url} alt={post.title} width={200} height='auto' />
            )}
          </div>
          <div>
            <p>
              <scan>👍</scan>
              {post.upvotes}
            </p>

            <UpvoteButton postId={id} updateUpvoteCount={updateUpvoteCount} />
          </div>
          <button className='edit-button' onClick={() => setIsEditing(true)}>
            Edit Post
          </button>
          <button className='delete-button' onClick={deletePost}>
            Delete Post
          </button>
          <CommentSection postId={id} />
        </>
      )}
    </div>
  );
}

export default PostDetailPage;
