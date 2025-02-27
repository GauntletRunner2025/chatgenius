import { createClient } from '@supabase/supabase-js';
// import { Channel, User } from './types/supabase';
// Removed import of Database as it does not exist in '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchDirectMessages = async (userId: string) => {
  const { data, error } = await supabase
    .from('direct_messages')
    .select('*')
    .or(`sender.eq.${userId},receiver.eq.${userId}`)
    .order('inserted_at', { ascending: true });

  if (error) {
    console.error('Error fetching direct messages:', error);
    return [];
  }

  return data;
};

export const sendDirectMessage = async (sender: string, receiver: string, message: string) => {
  const { data, error } = await supabase
    .from('direct_messages')
    .insert([{ sender, receiver, message }]);

  if (error) {
    console.error('Error sending direct message:', error);
    return null;
  }

  return data;
};
