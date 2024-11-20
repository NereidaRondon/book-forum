import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function UpvoteButton({ postId, updateUpvoteCount }) {
  const handleUpvote = async () => {
    try {
      // Fetch the current upvotes value
      const { data: currentData, error: fetchError } = await supabase
        .from('posts')
        .select('upvotes')
        .eq('id', postId)
        .single();

      if (fetchError) {
        console.error('Error fetching current upvotes:', fetchError);
        return;
      }

      const currentUpvotes = currentData?.upvotes || 0;

      // Increment the upvotes in the database
      const { error: updateError } = await supabase
        .from('posts')
        .update({ upvotes: currentUpvotes + 1 })
        .eq('id', postId);

      if (updateError) {
        console.error('Error updating upvotes:', updateError);
        return;
      }

      // Update the upvote count in the UI
      updateUpvoteCount(currentUpvotes + 1);
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
