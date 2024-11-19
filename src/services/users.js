import { supabase } from './supabase';

// Fetch all users
export const fetchUsers = async () => {
  const { data, error } = await supabase.from('users').select('*');

  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }
  return data;
};

// Create a user profile
export const createUser = async (user) => {
  const { error } = await supabase.from('users').insert([user]);

  if (error) {
    console.error('Error creating user:', error);
    return false;
  }
  return true;
};
