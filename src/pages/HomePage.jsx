import React, { useState, useEffect } from 'react';
import PostList from '../components/PostList';
import SearchBar from '../components/SearchBar';
import { createClient } from '@supabase/supabase-js';
import bookImage from '../assets/book.png';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('created_at');

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order(sortBy, { ascending: sortBy === 'created_at' });
      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data);
      }
    };
    fetchPosts();
  }, [sortBy]);

  const handleDelete = async (id) => {
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) {
      console.error('Error deleting post:', error);
    } else {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className='home-page'>
      <h2>Post A Book Rec</h2>
      <img src={bookImage} alt='Book' className='homepage-book-image' width={200} />
      <SearchBar query={query} setQuery={setQuery} />
      <div className='sort-options'>
        <label htmlFor='sort'>Sort by: </label>
        <select id='sort' value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='created_at'>Time Created</option>
          <option value='upvotes'>Upvotes</option>
        </select>
      </div>
      <PostList posts={filteredPosts} onDelete={handleDelete} />
    </div>
  );
}

export default HomePage;
