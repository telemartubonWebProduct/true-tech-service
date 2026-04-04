import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DIRECT_URL
});

async function run() {
  await client.connect();
  
  const queries = [
    `CREATE POLICY "Banners Insert" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'banners');`,
    `CREATE POLICY "Banners Update" ON storage.objects FOR UPDATE TO public WITH CHECK (bucket_id = 'banners');`,
    `CREATE POLICY "Banners Delete" ON storage.objects FOR DELETE TO public USING (bucket_id = 'banners');`,
    `CREATE POLICY "Banners Select" ON storage.objects FOR SELECT TO public USING (bucket_id = 'banners');`
  ];

  for (const query of queries) {
    try {
      await client.query(query);
      
    } catch (e) {
      console.error("Error on:", query, e.message);
    }
  }

  await client.end();
}

run();
