import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Booking ---
export async function saveBooking(data: {
  first_name: string;
  last_name: string;
  email: string;
  session_date: string;
  session_time: string;
  format: 'visio' | 'presentiel';
}) {
  const { error } = await supabase.from('bookings').insert([data]);
  if (error) throw error;
}

// --- Fetch booked slots ---
export async function getBookedSlots(startDate: string, endDate: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('session_date, session_time')
    .gte('session_date', startDate)
    .lte('session_date', endDate);
  if (error) throw error;
  return data as { session_date: string; session_time: string }[];
}

// --- Level Test Lead ---
export async function saveLead(data: {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  score: number;
  total: number;
  level?: string;
}) {
  const { error } = await supabase.from('leads').insert([data]);
  if (error) throw error;
}
