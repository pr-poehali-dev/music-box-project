import { useState } from 'react';
import Icon from './ui/icon';

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Твоё сообщение отправлено в бездну... Мы свяжемся с тобой, когда тьма позволит.');
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  const socialLinks = [
    { icon: 'Github', label: 'GitHub', href: '#' },
    { icon: 'Twitter', label: 'Twitter', href: '#' },
    { icon: 'Instagram', label: 'Instagram', href: '#' },
    { icon: 'Mail', label: 'Email', href: 'mailto:contact@musicbox.com' }
  ];

  return (
    <div className="container mx-auto px-4 max-w-4xl relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-5xl mb-4 text-horror text-[var(--blood-red)]">
          Свяжись с Нами
        </h2>
        <p className="text-xl text-[var(--ghost-white)] opacity-70">
          Если осмелишься заглянуть в бездну...
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-[var(--dark-gray)] rounded-lg border-2 border-[var(--blood-red)] shadow-horror p-8">
          <h3 className="text-2xl mb-6 text-[var(--blood-red)] font-bold">
            Отправь Сообщение
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[var(--ghost-white)] mb-2 opacity-80">
                Твоё Имя
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-[var(--shadow-gray)] border border-[var(--blood-red)] rounded text-[var(--ghost-white)] focus:outline-none focus:ring-2 focus:ring-[var(--blood-red)] transition-all"
                placeholder="Введи своё имя..."
              />
            </div>

            <div>
              <label className="block text-[var(--ghost-white)] mb-2 opacity-80">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-[var(--shadow-gray)] border border-[var(--blood-red)] rounded text-[var(--ghost-white)] focus:outline-none focus:ring-2 focus:ring-[var(--blood-red)] transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-[var(--ghost-white)] mb-2 opacity-80">
                Сообщение
              </label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 bg-[var(--shadow-gray)] border border-[var(--blood-red)] rounded text-[var(--ghost-white)] focus:outline-none focus:ring-2 focus:ring-[var(--blood-red)] transition-all resize-none"
                placeholder="Расскажи нам о своих страхах..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[var(--blood-red)] text-white rounded font-bold hover:bg-opacity-80 transition-all glow-red disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Icon name="Loader" size={20} className="animate-spin" />
                  Отправка...
                </>
              ) : (
                <>
                  <Icon name="Send" size={20} />
                  Отправить в Бездну
                </>
              )}
            </button>
          </form>
        </div>

        {/* Contact Info & Social */}
        <div className="space-y-8">
          {/* Social Links */}
          <div className="bg-[var(--dark-gray)] rounded-lg border-2 border-[var(--blood-red)] shadow-horror p-8">
            <h3 className="text-2xl mb-6 text-[var(--blood-red)] font-bold">
              Следуй за Нами
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex items-center gap-3 p-4 bg-[var(--shadow-gray)] rounded border border-[var(--blood-red)] hover-horror transition-all group"
                >
                  <Icon 
                    name={social.icon} 
                    size={24} 
                    className="text-[var(--blood-red)] group-hover:animate-pulse"
                  />
                  <span className="text-[var(--ghost-white)]">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div className="bg-[var(--dark-gray)] rounded-lg border-2 border-[var(--blood-red)] shadow-horror p-8">
            <blockquote className="text-center">
              <Icon name="Quote" size={40} className="text-[var(--blood-red)] mx-auto mb-4 opacity-50" />
              <p className="text-lg text-[var(--ghost-white)] italic mb-4">
                "Музыка — это язык души. Но некоторые мелодии говорят на языке тьмы..."
              </p>
              <cite className="text-[var(--blood-red)] text-sm">
                — Создатель Шкатулки
              </cite>
            </blockquote>
          </div>

          {/* Warning */}
          <div className="bg-[var(--shadow-gray)] rounded-lg border border-[var(--blood-red)] p-6 animate-pulse">
            <div className="flex items-start gap-3">
              <Icon name="AlertTriangle" size={24} className="text-[var(--blood-red)] flex-shrink-0" />
              <p className="text-[var(--ghost-white)] text-sm opacity-70">
                Внимание: Длительное прослушивание мелодии может вызвать беспокойство, 
                галлюцинации и навязчивые мысли. Слушайте на свой страх и риск.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
