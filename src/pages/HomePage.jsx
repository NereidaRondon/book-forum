import { useState, useEffect } from 'react';
import PostList from '../components/PostList';
import SearchBar from '../components/SearchBar';

function HomePage({ supabase }) {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');

  // Fetch posts from Supabase
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data);
      }
    };
    fetchPosts();
  }, [supabase]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className='home-page'>
      <h2>All Posts</h2>
      <SearchBar query={query} setQuery={setQuery} />
      <PostList posts={filteredPosts} />
    </div>
  );
}

export default HomePage;
