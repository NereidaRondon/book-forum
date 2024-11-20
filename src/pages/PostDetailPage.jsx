import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'react-router-dom';
import UpvoteButton from '../components/UpvoteButton';
import CommentSection from '../components/CommentSection';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setPost(data);
      }
    };
    fetchPost();
  }, [id]);

  const updateUpvoteCount = (newUpvoteCount) => {
    setPost((prevPost) => ({ ...prevPost, upvotes: newUpvoteCount }));
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className='post-detail'>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {post.image_url && <img src={post.image_url} alt={post.title} width={200} height={'auto'} />}
      <p>Upvotes: {post.upvotes}</p>
      <UpvoteButton postId={id} updateUpvoteCount={updateUpvoteCount} />

      <CommentSection postId={id} />
    </div>
  );
}

export default PostDetailPage;
