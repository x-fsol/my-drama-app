"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    async function getVideos() {
      const { data } = await supabase.from('episodes').select('*, dramas(title)');
      if (data) setVideos(data);
    }
    getVideos();
  }, []);

  return (
    <main style={{ backgroundColor: 'black', height: '100vh', color: 'white', overflowY: 'scroll' }}>
      {videos.length === 0 && <p style={{ textAlign: 'center', paddingTop: '20px' }}>Memuat Video...</p>}
      {videos.map((vid) => (
        <section key={vid.id} style={{ height: '100vh', position: 'relative' }}>
          <video src={vid.video_url} style={{ height: '100%', width: '100%', objectFit: 'cover' }} autoPlay loop muted playsInline />
          <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(0,0,0,0.5)', padding: '10px' }}>
            <h2>{vid.dramas?.title}</h2>
            <p>Episode {vid.episode_number}</p>
          </div>
        </section>
      ))}
    </main>
  );
}

