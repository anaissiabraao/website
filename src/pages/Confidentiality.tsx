import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/i18n/LanguageProvider';
import { COMPANY_INFO } from '@/types/services';

const Confidentiality = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const sections = [
    {
      title: t('confidentiality.commitment.title'),
      content: t('confidentiality.commitment.text'),
    },
    {
      title: t('confidentiality.scope.title'),
      content: t('confidentiality.scope.text'),
    },
    {
      title: t('confidentiality.obligations.title'),
      content: t('confidentiality.obligations.text'),
    },
    {
      title: t('confidentiality.duration.title'),
      content: t('confidentiality.duration.text'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <FileCheck className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-gradient">{t('confidentiality.title')}</h1>
                <p className="text-sm text-muted-foreground">
                  {t('privacy.lastUpdate')}: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('confidentiality.intro')}
            </p>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <Card key={index} className="hover:shadow-card-hover transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-2">
                  <span className="text-2xl font-bold text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="mt-8 bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">{t('contact.title')}</h3>
            <p className="text-muted-foreground mb-4">
              {t('confidentiality.contact')}:
            </p>
            <div className="space-y-2">
              <p>
                <strong>{t('contact.emailLabel')}:</strong>{' '}
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-primary hover:underline">
                  {COMPANY_INFO.email}
                </a>
              </p>
              <p>
                <strong>{t('contact.phoneLabel')}:</strong>{' '}
                <a href={`tel:${COMPANY_INFO.phone}`} className="text-primary hover:underline">
                  {COMPANY_INFO.phone}
                </a>
              </p>
              <p>
                <strong>{t('contact.locationLabel')}:</strong> {COMPANY_INFO.address}
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Confidentiality;
