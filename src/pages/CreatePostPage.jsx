import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleCreatePost = async () => {
    if (!title) {
      alert('Title is required!');
      return;
    }
    const { error } = await supabase
      .from('posts')
      .insert([{ title, content, image_url: imageUrl }]);

    if (error) {
      console.error('Error creating post:', error);
    } else {
      navigate('/');
    }
  };

  return (
    <div className='create-post'>
      <h2>Create New Post</h2>
      <input
        type='text'
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder='Content'
        value={content}
        onChange={(e) => setContent(e.target.value)}></textarea>
      <input
        type='text'
        placeholder='Image URL (optional)'
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={handleCreatePost}>Submit</button>
    </div>
  );
}

export default CreatePostPage;
