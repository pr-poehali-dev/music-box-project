import { useState } from 'react';
import Icon from './ui/icon';

const albums = [
  {
    id: 1,
    title: 'Тени Прошлого',
    description: 'Забытые воспоминания, которые не дают покоя...',
    theme: 'abandoned'
  },
  {
    id: 2,
    title: 'Ночные Кошмары',
    description: 'То, что приходит, когда гаснет свет...',
    theme: 'darkness'
  },
  {
    id: 3,
    title: 'Проклятые Души',
    description: 'Они не могут найти покой в этом мире...',
    theme: 'ghosts'
  },
  {
    id: 4,
    title: 'Безумие',
    description: 'Грань между реальностью и галлюцинацией стёрта...',
    theme: 'madness'
  },
  {
    id: 5,
    title: 'Последний Вздох',
    description: 'Финальные мгновения перед вечной тьмой...',
    theme: 'death'
  }
];

export default function AlbumGallery() {
  const [hoveredAlbum, setHoveredAlbum] = useState<number | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {albums.map((album) => (
          <div
            key={album.id}
            className="relative group cursor-pointer"
            onMouseEnter={() => setHoveredAlbum(album.id)}
            onMouseLeave={() => setHoveredAlbum(null)}
            onClick={() => setSelectedAlbum(album.id)}
          >
            {/* Album Cover */}
            <div className="relative aspect-square bg-gradient-to-br from-[var(--dark-gray)] to-[var(--shadow-gray)] rounded-lg overflow-hidden border-2 border-[var(--blood-red)] shadow-horror transition-all duration-300 hover-horror">
              {/* Placeholder with horror aesthetic */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`transition-all duration-500 ${
                  hoveredAlbum === album.id ? 'scale-110 opacity-100' : 'scale-100 opacity-70'
                }`}>
                  <Icon 
                    name="Skull" 
                    size={120} 
                    className="text-[var(--blood-red)] opacity-50"
                  />
                </div>
              </div>

              {/* Dark overlay */}
              <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                hoveredAlbum === album.id ? 'opacity-30' : 'opacity-60'
              }`}></div>

              {/* Floating particles effect */}
              {hoveredAlbum === album.id && (
                <div className="absolute inset-0">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-[var(--blood-red)] rounded-full animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random() * 2}s`
                      }}
                    ></div>
                  ))}
                </div>
              )}

              {/* Album number */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--blood-red)] rounded-full flex items-center justify-center glow-red">
                <span className="text-white font-bold text-xl">{album.id}</span>
              </div>
            </div>

            {/* Album Info */}
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-bold text-[var(--blood-red)] mb-2 text-horror">
                {album.title}
              </h3>
              <p className="text-[var(--ghost-white)] opacity-70 text-sm italic">
                {album.description}
              </p>
            </div>

            {/* Hover effect - glowing border */}
            {hoveredAlbum === album.id && (
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--blood-red)] to-transparent opacity-50 blur-lg -z-10 rounded-lg animate-pulse"></div>
            )}
          </div>
        ))}
      </div>

      {/* Modal for selected album */}
      {selectedAlbum && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 animate-fade-in"
          onClick={() => setSelectedAlbum(null)}
        >
          <div className="relative max-w-2xl w-full mx-4 bg-[var(--dark-gray)] rounded-lg border-2 border-[var(--blood-red)] shadow-horror p-8">
            <button
              onClick={() => setSelectedAlbum(null)}
              className="absolute top-4 right-4 text-[var(--ghost-white)] hover:text-[var(--blood-red)] transition-colors"
            >
              <Icon name="X" size={32} />
            </button>
            
            <div className="text-center">
              <h2 className="text-4xl mb-4 text-horror text-[var(--blood-red)]">
                {albums[selectedAlbum - 1].title}
              </h2>
              <p className="text-xl text-[var(--ghost-white)] mb-8">
                {albums[selectedAlbum - 1].description}
              </p>
              <div className="aspect-square bg-[var(--shadow-gray)] rounded-lg border border-[var(--blood-red)] flex items-center justify-center">
                <Icon name="Skull" size={200} className="text-[var(--blood-red)] opacity-30" />
              </div>
              <p className="mt-6 text-[var(--ghost-white)] opacity-60 italic">
                "Некоторые образы слишком пугающие, чтобы показать их полностью..."
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
