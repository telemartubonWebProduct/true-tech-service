import { createClient } from "./supabase";

const BUCKET_NAME = "banners";

/**
 * Upload a banner image file to Supabase Storage.
 * Returns the public URL of the uploaded image.
 */
export async function uploadBannerImage(file: File): Promise<string> {
  const supabase = createClient();

  // Generate a unique filename to avoid collisions
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  // Get the public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

  return publicUrl;
}

export async function deleteBannerImage(imageUrl: string): Promise<void> {
  const supabase = createClient();

  // Extract file path from the public URL
  // URL format: https://<project>.supabase.co/storage/v1/object/public/banners/<filename>
  const url = new URL(imageUrl);
  const pathParts = url.pathname.split(`/storage/v1/object/public/${BUCKET_NAME}/`);

  if (pathParts.length < 2) {
    console.warn("Could not extract file path from URL:", imageUrl);
    return;
  }

  const filePath = decodeURIComponent(pathParts[1]);

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([filePath]);

  if (error) {
    throw new Error(`Failed to delete image: ${error.message}`);
  }
}

/**
 * Generic function to delete an image by its Supabase public URL.
 * Automatically extracts the bucket name and the file path.
 */
export async function deleteImageByUrl(imageUrl: string): Promise<void> {
  if (!imageUrl) return;
  try {
    const supabase = createClient();
    const url = new URL(imageUrl);
    
    // URL format: https://<project>.supabase.co/storage/v1/object/public/<bucket>/<filename>
    const match = url.pathname.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)$/);
    if (!match) {
      console.warn("Could not extract bucket and file path from URL:", imageUrl);
      return;
    }

    const bucketName = decodeURIComponent(match[1]);
    const filePath = decodeURIComponent(match[2]);

    const { error } = await supabase.storage
      .from(bucketName)
      .remove([filePath]);

    if (error) {
      console.error(`Failed to delete image from bucket ${bucketName}:`, error.message);
    }
  } catch (error) {
    console.error("Error parsing URL for image deletion:", error);
  }
}
