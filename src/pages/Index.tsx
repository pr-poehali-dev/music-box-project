import { useState, useEffect } from 'react';
import MusicBox from '@/components/MusicBox';
import AlbumGallery from '@/components/AlbumGallery';
import Contacts from '@/components/Contacts';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new AudioContext();
    
    let oscillator: OscillatorNode | null = null;
    let gainNode: GainNode | null = null;

    const playHorrorMelody = () => {
      if (oscillator) return;

      oscillator = audioContext.createOscillator();
      gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      const notes = [220, 207.65, 196, 185, 196, 207.65];
      let noteIndex = 0;
      
      oscillator.type = 'sine';
      oscillator.frequency.value = notes[0];
      gainNode.gain.value = 0.1;
      
      oscillator.start();
      setIsPlaying(true);

      const interval = setInterval(() => {
        noteIndex = (noteIndex + 1) % notes.length;
        if (oscillator) {
          oscillator.frequency.setValueAtTime(notes[noteIndex], audioContext.currentTime);
        }
      }, 800);

      return () => {
        clearInterval(interval);
        if (oscillator) {
          oscillator.stop();
          oscillator = null;
        }
      };
    };

    const cleanup = playHorrorMelody();
    
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen grain-effect relative overflow-hidden">
      {/* Parallax fog layers */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-[var(--fog-white)] to-transparent opacity-20"></div>
      </div>

      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--blood-red)] opacity-5 blur-3xl rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--blood-red)] opacity-5 blur-3xl rounded-full"></div>
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--shadow-gray)] border-b border-[var(--blood-red)] shadow-horror backdrop-blur-sm bg-opacity-95">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl text-horror text-[var(--blood-red)]">
            The Music Box
          </h1>
          <div className="flex gap-6">
            {[
              { id: 'home', label: 'Шкатулка', icon: 'Music' },
              { id: 'albums', label: 'Альбомы', icon: 'Images' },
              { id: 'contacts', label: 'Контакты', icon: 'MessageSquare' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded transition-all hover-horror ${
                  activeSection === item.id 
                    ? 'bg-[var(--blood-red)] text-white glow-red' 
                    : 'text-[var(--ghost-white)] hover:text-[var(--blood-red)]'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="pt-20 relative z-10">
        <section 
          id="home" 
          className="min-h-screen flex items-center justify-center py-20 relative"
        >
          <div 
            style={{ 
              transform: `translateY(${scrollY * 0.15}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <MusicBox isPlaying={isPlaying} />
          </div>
        </section>

        <section 
          id="albums" 
          className="min-h-screen py-20 bg-[var(--shadow-gray)] relative"
        >
          <div 
            className="container mx-auto px-4"
            style={{ 
              transform: `translateY(${Math.max(0, scrollY - 400) * 0.1}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <h2 
              className="text-5xl text-center mb-16 text-horror text-[var(--blood-red)]"
              style={{ 
                transform: `translateY(${Math.max(0, scrollY - 300) * 0.2}px)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              Альбомы Ужаса
            </h2>
            <AlbumGallery />
          </div>
        </section>

        <section 
          id="contacts" 
          className="min-h-screen flex items-center justify-center py-20 relative"
        >
          <div 
            style={{ 
              transform: `translateY(${Math.max(0, scrollY - 1200) * 0.15}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <Contacts />
          </div>
        </section>
      </main>

      <footer className="bg-[var(--shadow-gray)] border-t border-[var(--blood-red)] py-8">
        <div className="container mx-auto px-4 text-center text-[var(--ghost-white)] opacity-50">
          <p>© 2026 The Music Box. Все кошмары защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;