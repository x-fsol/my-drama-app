"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Heart, MessageCircle, Share2, Music2 } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    async function getVideos() {
      const { data } = await supabase.from('episodes').select('*, dramas(title, description)');
      if (data) setVideos(data);
    }
    getVideos();
  }, []);

  return (
    <main className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory">
      {videos.map((vid) => (
        <section key={vid.id} className="h-screen w-full snap-start relative flex flex-col justify-center overflow-hidden">
          <video 
            src={vid.video_url} 
            className="h-full w-full object-cover" 
            loop playsInline autoPlay muted 
          />
          <div className="absolute right-4 bottom-24 flex flex-col gap-6 items-center z-20">
            <Heart className="w-8 h-8 text-white" />
            <MessageCircle className="w-8 h-8 text-white" />
            <Share2 className="w-8 h-8 text-white" />
          </div>
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black text-white z-10">
            <h2 className="text-xl font-bold">@{vid.dramas?.title || 'Drama Viral'}</h2>
            <p className="text-sm opacity-90">Episode {vid.episode_number}</p>
            <div className="flex items-center gap-2 mt-2">
              <Music2 className="w-4 h-4" />
              <span className="text-sm italic">Original Sound - Drama China</span>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
