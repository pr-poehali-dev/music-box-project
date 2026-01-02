import { useState } from 'react';

interface MusicBoxProps {
  isPlaying: boolean;
}

export default function MusicBox({ isPlaying }: MusicBoxProps) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setRotation((prev) => prev + e.movementX * 2);
    }
  };

  return (
    <div className="relative z-10 w-full">
      <div className="text-center mb-12 parallax-text">
        <h2 className="text-6xl mb-4 text-horror text-[var(--blood-red)] animate-pulse">
          Музыкальная Шкатулка
        </h2>
        <p className="text-xl text-[var(--ghost-white)] opacity-70">
          Крути ручку, чтобы услышать мрачную мелодию...
        </p>
      </div>

      <div className="flex flex-col items-center gap-8">
        {/* Music Box Container */}
        <div className="relative w-[500px] h-[400px] perspective-1000">
          {/* Realistic Music Box */}
          <div className="relative w-full h-full transform-style-3d">
            {/* Box Base - Wooden texture */}
            <div 
              className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl"
              style={{
                backgroundImage: `url('https://cdn.poehali.dev/projects/2ccb8a01-b5ab-4099-8ef2-c2a8098ec94c/files/66342898-6f35-4e92-b9bf-96ea83b505ce.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(139, 0, 0, 0.3)'
              }}
            >
              {/* Wooden border details */}
              <div className="absolute inset-0 border-4 border-[#3d2817] rounded-lg opacity-60"></div>
              <div className="absolute inset-3 border-2 border-[#8b4513] rounded opacity-40"></div>
              
              {/* Dark overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60"></div>
            </div>

            {/* Center Mechanism - Metal cylinder */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56">
              {/* Mechanism base plate */}
              <div 
                className="absolute inset-0 rounded-lg overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)',
                  boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.8), 0 4px 15px rgba(139, 0, 0, 0.4)'
                }}
              >
                {/* Metal texture overlay */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `url('https://cdn.poehali.dev/projects/2ccb8a01-b5ab-4099-8ef2-c2a8098ec94c/files/6b74327e-3b5c-474d-bda5-ae0750b0df21.jpg')`,
                  backgroundSize: 'cover',
                  mixBlendMode: 'overlay'
                }}></div>
              </div>

              {/* Rotating cylinder with pins */}
              <div className="absolute inset-4">
                <div 
                  className={`w-full h-full rounded-lg relative ${isPlaying ? 'animate-spin' : ''}`}
                  style={{
                    animationDuration: '8s',
                    transform: `rotate(${rotation}deg)`,
                    background: 'linear-gradient(90deg, #4a4a4a 0%, #2a2a2a 25%, #4a4a4a 50%, #2a2a2a 75%, #4a4a4a 100%)',
                    boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(139, 0, 0, 0.3)'
                  }}
                >
                  {/* Cylinder pins */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-3 bg-gradient-to-b from-[#8b7355] to-[#5d4e37] rounded-full"
                      style={{
                        left: `${(i * 8) + 10}%`,
                        top: `${20 + (i % 3) * 25}%`,
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.8)'
                      }}
                    ></div>
                  ))}
                  
                  {/* Center shaft */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-[#cd7f32] to-[#8b4513] glow-red border border-[#3d2817]"></div>
                </div>
              </div>
            </div>

            {/* Winding Handle - Brass finish */}
            <div
              className="absolute right-12 top-1/2 transform -translate-y-1/2 cursor-grab active:cursor-grabbing z-20"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseUp}
            >
              <div className="relative w-20 h-20">
                {/* Handle arm - brass */}
                <div 
                  className="absolute right-0 top-1/2 w-16 h-3 rounded-full transition-transform hover:scale-110"
                  style={{ 
                    transform: `rotate(${rotation * 0.1}deg)`,
                    background: 'linear-gradient(90deg, #8b7355 0%, #cd7f32 50%, #b8860b 100%)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.3)'
                  }}
                ></div>
                
                {/* Handle grip - wooden knob */}
                <div 
                  className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full transition-transform hover:scale-125"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, #8b4513, #3d2817)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.8), inset -2px -2px 4px rgba(0, 0, 0, 0.6), inset 2px 2px 4px rgba(139, 69, 19, 0.4)'
                  }}
                >
                  {/* Wood grain detail */}
                  <div className="absolute inset-1 rounded-full border border-[#5d4e37] opacity-40"></div>
                </div>
              </div>
            </div>

            {/* Decorative brass corners */}
            {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map((pos, i) => (
              <div
                key={i}
                className={`absolute ${pos} w-8 h-8`}
                style={{
                  background: 'radial-gradient(circle, #cd7f32, #8b7355)',
                  clipPath: 'polygon(0 0, 100% 0, 100% 30%, 30% 30%, 30% 100%, 0 100%)',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.6)'
                }}
              ></div>
            ))}

            {/* Sound visualization - Musical notes */}
            {isPlaying && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="text-2xl animate-bounce text-[#cd7f32] opacity-70"
                    style={{
                      animationDelay: `${i * 0.15}s`,
                      animationDuration: '1.2s'
                    }}
                  >
                    ♪
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center max-w-md">
          <p className="text-[var(--ghost-white)] opacity-60 italic">
            "Каждый оборот ручки пробуждает что-то тёмное... 
            Мелодия никогда не заканчивается, она лишь повторяется вечно..."
          </p>
        </div>
      </div>
    </div>
  );
}