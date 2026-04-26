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
    <div style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      {videos.length === 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <p>Memuat Video...</p>
        </div>
      ) : (
        <div style={{ overflowY: 'scroll', scrollSnapType: 'y mandatory', height: '100vh' }}>
          {videos.map((vid) => (
            <section key={vid.id} style={{ height: '100vh', scrollSnapAlign: 'start', position: 'relative' }}>
              <video 
                src={vid.video_url} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                autoPlay loop muted playsInline 
              />
              <div style={{ position: 'absolute', bottom: '40px', left: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                <h1 style={{ fontSize: '24px', margin: 0 }}>{vid.dramas?.title || 'Drama Baru'}</h1>
                <p style={{ fontSize: '16px' }}>Episode {vid.episode_number}</p>
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

