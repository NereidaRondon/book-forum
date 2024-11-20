import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function UpvoteButton({ postId, updateUpvoteCount }) {
  const handleUpvote = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update({ upvotes: supabase.raw('upvotes + 1') })
        .eq('id', postId)
        .select();

      if (error) {
        console.error('Error updating upvotes:', error);
        return;
      }

      if (data && data.length > 0) {
        updateUpvoteCount(data[0].upvotes);
      }
    } catch (error) {
      console.error('Error handling upvote:', error);
    }
  };

  return (
    <button onClick={handleUpvote} className='upvote-button'>
      Upvote
    </button>
  );
}

export default UpvoteButton;
