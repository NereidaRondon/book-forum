import PostCard from './PostCard';

function PostList({ posts, onDelete }) {
  return (
    <div className='post-list'>
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} onDelete={onDelete} />)
      ) : (
        <p>No posts available!</p>
      )}
    </div>
  );
}

export default PostList;
