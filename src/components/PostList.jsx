import PostCard from './PostCard';

function PostList({ posts }) {
  return (
    <div className='post-list'>
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p>No posts available!</p>
      )}
    </div>
  );
}

export default PostList;
