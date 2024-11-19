import '../App.css';

function PostCard({ post }) {
  return (
    <div className='post-card'>
      <h2>{post.title}</h2>
      <p>Upvotes: {post.upvotes}</p>
      <p>Created At: {new Date(post.created_at).toLocaleString()}</p>
      <a href={`/post/${post.id}`} className='post-link'>
        View Details
      </a>
    </div>
  );
}

export default PostCard;
