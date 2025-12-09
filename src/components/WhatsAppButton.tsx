import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/i18n/LanguageProvider';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();
  
  const whatsappNumber = '5547988395126';
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <>
      {/* Floating Button */}
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
          className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap bg-background border border-border rounded-lg px-4 py-2 shadow-lg transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
          }`}
        >
          <p className="font-semibold text-sm">{t('whatsapp.sales')}</p>
          <p className="text-xs text-muted-foreground">{t('whatsapp.online')}</p>
          {/* Arrow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-border"></div>
          </div>
        </div>

        {/* Main Button */}
        <Button
          size="lg"
          className="h-16 w-16 rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-110 bg-[#25D366] hover:bg-[#20BA5A] text-white border-0"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>

        {/* Pulse Animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
      </a>

      {/* Mobile-optimized version - shows text on smaller screens */}
      <style>{`
        @media (max-width: 640px) {
          .whatsapp-button-mobile {
            bottom: 1rem;
            right: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default WhatsAppButton;
