import { createBrowserClient } from "@supabase/ssr";

/**
 * Client-side Supabase client.
 * Use this in client components (e.g., for auth, storage uploads).
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
