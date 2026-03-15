import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase URL or Service Role Key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createBucket() {
  const { data, error } = await supabase.storage.createBucket("banners", {
    public: true, // It needs to be public for images
    allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
    fileSizeLimit: 5242880, // 5MB
  });

  if (error) {
    if (error.message.includes("already exists")) {
      console.log("Bucket 'banners' already exists");
    } else {
      console.error("Error creating bucket:", error);
    }
  } else {
    console.log("Successfully created bucket 'banners':", data);
  }
}

createBucket();
