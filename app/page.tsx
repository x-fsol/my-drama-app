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
    <main className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
      <style jsx global>{`
        @keyframes scrollText {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-text {
          display: inline-block;
          white-space: nowrap;
          animation: scrollText 10s linear infinite;
        }
      `}</style>

      {videos.length === 0 && (
        <div className="h-screen flex items-center justify-center text-white font-medium animate-pulse">
          Memuat Drama Terbaik...
        </div>
      )}
      
      {videos.map((vid) => (
        <section key={vid.id} className="h-screen w-full snap-start relative flex flex-col justify-center overflow-hidden">
          <video 
            src={vid.video_url} 
            className="h-full w-full object-cover" 
            loop 
            playsInline 
            autoPlay 
            muted 
            onClick={(e) => (e.currentTarget.paused ? e.currentTarget.play() : e.currentTarget.pause())}
          />

          <div className="absolute right-4 bottom-24 flex flex-col gap-6 items-center z-20">
            <div className="flex flex-col items-center gap-1 group">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-full">
                <Heart className="w-7 h-7 text-white fill-transparent" />
              </div>
              <span className="text-white text-xs font-semibold">12.5k</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-full">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <span className="text-white text-xs font-semibold">850</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-full">
                <Share2 className="w-7 h-7 text-white" />
              </div>
              <span className="text-white text-xs font-semibold">Share</span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white z-10">
            <h2 className="text-xl font-bold mb-1">@{vid.dramas?.title || 'Drama Viral'}</h2>
            <p className="text-sm opacity-90 mb-3 line-clamp-2 max-w-[80%]">
              Episode {vid.episode_number}: {vid.dramas?.description || 'Tonton keseruannya di sini!'}
            </p>
            <div className="flex items-center gap-2 overflow-hidden w-48">
              <Music2 className="w-4 h-4 flex-shrink-0" />
              <div className="animate-text text-sm italic italic">
                Original Sound - Drama China Terbaru 2026 - {vid.dramas?.title}
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-1 bg-red-600 w-[30%] z-30 shadow-[0_0_8px_rgba(220,38,38,0.8)]"></div>
        </section>
      ))}
    </main>
  );
}
