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
    <main className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory">
      {videos.length === 0 && (
        <div className="h-screen flex items-center justify-center text-white">Belum ada video...</div>
      )}
      {videos.map((vid) => (
        <section key={vid.id} className="h-screen w-full snap-start relative">
          <video src={vid.video_url} className="h-full w-full object-cover" loop playsInline controls />
          <div className="absolute bottom-10 left-5 text-white p-4">
            <h2 className="text-xl font-bold">{vid.dramas?.title}</h2>
            <p className="opacity-80">Episode {vid.episode_number}</p>
          </div>
        </section>
      ))}
    </main>
  );
}
