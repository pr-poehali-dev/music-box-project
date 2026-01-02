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
    <div className="relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-6xl mb-4 text-horror text-[var(--blood-red)] animate-pulse">
          Музыкальная Шкатулка
        </h2>
        <p className="text-xl text-[var(--ghost-white)] opacity-70">
          Крути ручку, чтобы услышать мрачную мелодию...
        </p>
      </div>

      <div className="flex flex-col items-center gap-8">
        {/* Music Box */}
        <div className="relative w-80 h-80 bg-gradient-to-b from-[#1a0a0a] to-[var(--dark-gray)] rounded-lg shadow-horror border-2 border-[var(--blood-red)] p-8">
          {/* Box decoration */}
          <div className="absolute inset-4 border border-[var(--blood-red)] opacity-30 rounded"></div>
          <div className="absolute inset-6 border border-[var(--blood-red)] opacity-20 rounded"></div>

          {/* Center disc */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-[var(--dark-gray)] to-[#000] rounded-full shadow-horror border-4 border-[var(--blood-red)] flex items-center justify-center">
            <div 
              className={`w-32 h-32 rounded-full bg-[var(--shadow-gray)] border-2 border-[var(--blood-red)] flex items-center justify-center ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{
                animationDuration: '8s',
                transform: `rotate(${rotation}deg)`
              }}
            >
              <div className="w-4 h-4 bg-[var(--blood-red)] rounded-full glow-red"></div>
            </div>
          </div>

          {/* Handle */}
          <div
            className="absolute right-8 top-1/2 transform -translate-y-1/2 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
          >
            <div className="relative w-16 h-24">
              {/* Handle stick */}
              <div 
                className="absolute right-0 top-1/2 w-12 h-2 bg-gradient-to-r from-[var(--dark-gray)] to-[var(--blood-red)] rounded-full shadow-horror transition-transform hover:scale-110"
                style={{ transform: `rotate(${rotation * 0.1}deg)` }}
              ></div>
              {/* Handle knob */}
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[var(--blood-red)] rounded-full glow-red border-2 border-[var(--ghost-white)] transition-transform hover:scale-125"></div>
            </div>
          </div>

          {/* Sound waves visualization */}
          {isPlaying && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-[var(--blood-red)] rounded-full animate-pulse"
                  style={{
                    height: `${20 + Math.random() * 20}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '0.8s'
                  }}
                ></div>
              ))}
            </div>
          )}
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
