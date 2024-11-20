import React from 'react';

function PostCard({ post, onDelete }) {
  return (
    <div className='post-card'>
      <h2>{post.title}</h2>
      <p>Created At: {new Date(post.created_at).toLocaleString()}</p>
      <p>Upvotes: {post.upvotes}</p>
      <a href={`/post/${post.id}`} className='post-link'>
        View Details
      </a>
      <button className='delete-button' onClick={() => onDelete(post.id)}>
        Delete
      </button>
    </div>
  );
}

export default PostCard;
