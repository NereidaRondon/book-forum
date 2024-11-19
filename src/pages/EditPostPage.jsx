import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useParams, useNavigate } from 'react-router-dom';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function EditPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

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

  const handleUpdatePost = async () => {
    const { error } = await supabase
      .from('posts')
      .update({ title: post.title, content: post.content, image_url: post.image_url })
      .eq('id', id);

    if (error) {
      console.error('Error updating post:', error);
    } else {
      navigate(`/post/${id}`);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className='edit-post'>
      <h2>Edit Post</h2>
      <input
        type='text'
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <textarea
        value={post.content}
        onChange={(e) => setPost({ ...post, content: e.target.value })}></textarea>
      <input
        type='text'
        value={post.image_url}
        onChange={(e) => setPost({ ...post, image_url: e.target.value })}
      />
      <button onClick={handleUpdatePost}>Update</button>
    </div>
  );
}

export default EditPostPage;
