function PostCard({ post }) {
  return (
    <div className='post-card'>
      <h2>{post.title}</h2>
      <p>{new Date(post.created_at).toLocaleString()}</p>
      <p>
        Upvotes <scan>👍</scan>: {post.upvotes}
      </p>
      <br />
      <a href={`/post/${post.id}`} className='post-link'>
        View Details
      </a>
    </div>
  );
}

export default PostCard;
