import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const whatsappNumber = '5547988395126';
  const autoMessage = encodeURIComponent('Olá! Quero um diagnóstico gratuito para automação.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${autoMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip */}
      <div
        className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap bg-card border border-border rounded-lg px-4 py-2 shadow-lg transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        <p className="font-semibold text-sm text-foreground">Diagnóstico Gratuito</p>
        <p className="text-xs text-muted-foreground">Estamos online</p>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-border" />
        </div>
      </div>

      <Button
        size="lg"
        className="h-14 w-14 md:h-16 md:w-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 bg-[#25D366] hover:bg-[#20BA5A] text-primary-foreground border-0"
      >
        <MessageCircle className="h-7 w-7 md:h-8 md:w-8" />
      </Button>
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75" />
    </a>
  );
};

export default WhatsAppButton;
