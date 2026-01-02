import { useState } from 'react';
import Icon from './ui/icon';

const albums = [
  {
    id: 1,
    title: 'Тени Прошлого',
    description: 'Забытые воспоминания, которые не дают покоя...',
    theme: 'abandoned',
    image: 'https://cdn.poehali.dev/projects/2ccb8a01-b5ab-4099-8ef2-c2a8098ec94c/files/64b657b6-a6e9-4ad0-851a-31cf449af07a.jpg'
  },
  {
    id: 2,
    title: 'Ночные Кошмары',
    description: 'То, что приходит, когда гаснет свет...',
    theme: 'darkness',
    image: 'https://cdn.poehali.dev/projects/2ccb8a01-b5ab-4099-8ef2-c2a8098ec94c/files/7c2fd989-fb97-4f00-94cc-928e75e06880.jpg'
  },
  {
    id: 3,
    title: 'Проклятые Души',
    description: 'Они не могут найти покой в этом мире...',
    theme: 'ghosts',
    image: 'https://cdn.poehali.dev/projects/2ccb8a01-b5ab-4099-8ef2-c2a8098ec94c/files/2eabf459-e5ab-454b-b781-088c446bed5b.jpg'
  },
  {
    id: 4,
    title: 'Безумие',
    description: 'Грань между реальностью и галлюцинацией стёрта...',
    theme: 'madness',
    image: 'https://cdn.poehali.dev/projects/2ccb8a01-b5ab-4099-8ef2-c2a8098ec94c/files/a894bd72-7e25-4cba-9d2f-c09b04149dda.jpg'
  },
  {
    id: 5,
    title: 'Последний Вздох',
    description: 'Финальные мгновения перед вечной тьмой...',
    theme: 'death',
    image: 'https://cdn.poehali.dev/projects/2ccb8a01-b5ab-4099-8ef2-c2a8098ec94c/files/ff633a13-6732-47cb-a005-73f01f4400a6.jpg'
  }
];

export default function AlbumGallery() {
  const [hoveredAlbum, setHoveredAlbum] = useState<number | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {albums.map((album, index) => (
          <div
            key={album.id}
            className="relative group cursor-pointer"
            onMouseEnter={() => setHoveredAlbum(album.id)}
            onMouseLeave={() => setHoveredAlbum(null)}
            onClick={() => setSelectedAlbum(album.id)}
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
            }}
          >
            {/* Album Cover */}
            <div className="relative aspect-square bg-gradient-to-br from-[var(--dark-gray)] to-[var(--shadow-gray)] rounded-lg overflow-hidden border-2 border-[var(--blood-red)] shadow-horror transition-all duration-300 hover-horror">
              {/* Horror image */}
              <img 
                src={album.image} 
                alt={album.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                  hoveredAlbum === album.id ? 'scale-110' : 'scale-100'
                }`}
              />

              {/* Dark overlay */}
              <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                hoveredAlbum === album.id ? 'opacity-20' : 'opacity-40'
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
              <div className="aspect-square bg-[var(--shadow-gray)] rounded-lg border border-[var(--blood-red)] overflow-hidden">
                <img 
                  src={albums[selectedAlbum - 1].image}
                  alt={albums[selectedAlbum - 1].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-6 text-[var(--ghost-white)] opacity-60 italic">
                "Взгляни в бездну... если осмелишься..."
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}