import { useState } from 'react';
import { Service, SelectedService, SERVICES, CATEGORY_LABELS } from '@/types/services';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Plus, Trash2, Edit2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTranslation } from '@/i18n/LanguageProvider';
import { useCurrency } from '@/currency/CurrencyProvider';
import { getServiceText } from '@/i18n/serviceText';

interface ServiceSelectorProps {
  selectedServices: SelectedService[];
  onServicesChange: (services: SelectedService[]) => void;
}

export const ServiceSelector = ({ selectedServices, onServicesChange }: ServiceSelectorProps) => {
  const { t } = useTranslation();
  const { formatMoneyRange, formatMoney } = useCurrency();
  const [editingService, setEditingService] = useState<SelectedService | null>(null);
  const [customPrice, setCustomPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [notes, setNotes] = useState('');

  const categories = Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>;

  const isServiceSelected = (serviceId: string) => {
    return selectedServices.some(s => s.id === serviceId);
  };

  const addService = (service: Service) => {
    if (!isServiceSelected(service.id)) {
      onServicesChange([...selectedServices, { ...service }]);
    }
  };

  const removeService = (serviceId: string) => {
    onServicesChange(selectedServices.filter(s => s.id !== serviceId));
  };

  const openEditDialog = (service: SelectedService) => {
    setEditingService(service);
    setCustomPrice(service.customPrice?.toString() || '');
    setQuantity(service.quantity?.toString() || '1');
    setNotes(service.notes || '');
  };

  const saveServiceEdit = () => {
    if (editingService) {
      const updatedServices = selectedServices.map(s => 
        s.id === editingService.id 
          ? {
              ...s,
              customPrice: customPrice ? parseFloat(customPrice) : undefined,
              quantity: quantity ? parseInt(quantity) : 1,
              notes: notes || undefined,
            }
          : s
      );
      onServicesChange(updatedServices);
      setEditingService(null);
      setCustomPrice('');
      setQuantity('1');
      setNotes('');
    }
  };

  const calculateTotal = () => {
    return selectedServices.reduce((total, service) => {
      const price = service.customPrice || service.priceMax;
      const qty = service.quantity || 1;
      return total + (price * qty);
    }, 0);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue={categories[0]} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          {categories.map(category => (
            <TabsTrigger key={category} value={category}>
              {t(`services.${category}`)}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category} value={category} className="space-y-4 mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {SERVICES.filter(s => s.category === category).map(service => {
                const selected = isServiceSelected(service.id);
                const st = getServiceText(t, service);
                return (
                  <Card 
                    key={service.id} 
                    className={`relative transition-all ${selected ? 'ring-2 ring-primary' : ''}`}
                  >
                    {selected && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-primary">
                          <Check className="h-3 w-3 mr-1" />
                          {t("serviceSelector.selected")}
                        </Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-lg">{st.name}</CardTitle>
                      <CardDescription>{st.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-primary">
                          {formatMoneyRange(service.priceMin, service.priceMax, service.unit)}
                          {service.unit && <span className="text-muted-foreground">{service.unit}</span>}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t("serviceSelector.deadline")}: {service.deliveryDays.min}-{service.deliveryDays.max} {t("quote.days")}
                        </p>
                      </div>
                      <Button
                        onClick={() => selected ? removeService(service.id) : addService(service)}
                        variant={selected ? 'destructive' : 'default'}
                        className="w-full"
                        size="sm"
                      >
                        {selected ? (
                          <>
                            <Trash2 className="h-4 w-4 mr-2" />
                            {t("serviceSelector.remove")}
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            {t("serviceSelector.add")}
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {selectedServices.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t("serviceSelector.selectedServicesTitle")} ({selectedServices.length})</CardTitle>
            <CardDescription>
              {t("serviceSelector.selectedServicesSubtitle")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedServices.map(service => {
              const price = service.customPrice || service.priceMax;
              const qty = service.quantity || 1;
              const subtotal = price * qty;
              const st = getServiceText(t, service);

              return (
                <Dialog key={service.id}>
                  <DialogTrigger asChild>
                    <div 
                      className="flex items-center justify-between p-4 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
                      onClick={() => openEditDialog(service)}
                    >
                      <div className="flex-1">
                        <p className="font-medium">{st.name}</p>
                        {service.notes && (
                          <p className="text-xs text-muted-foreground mt-1">{service.notes}</p>
                        )}
                      </div>
                      <div className="text-right mr-4">
                        <p className="font-semibold text-primary">
                          {formatMoney(subtotal, { includeCode: false })}
                        </p>
                        {qty > 1 && (
                          <p className="text-xs text-muted-foreground">
                            {qty}x {formatMoney(price, { includeCode: false })}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeService(service.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t("serviceSelector.customizeTitle")}</DialogTitle>
                      <DialogDescription>{st.name}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="customPrice">
                          {t("serviceSelector.customPrice")}
                        </Label>
                        <Input
                          id="customPrice"
                          type="number"
                          placeholder={`${t("serviceSelector.defaultPrice")}: ${formatMoney(service.priceMax)}`}
                          value={customPrice}
                          onChange={(e) => setCustomPrice(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          {t("serviceSelector.suggestedRange")}: {formatMoneyRange(service.priceMin, service.priceMax, service.unit)}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quantity">{t("serviceSelector.quantity")}</Label>
                        <Input
                          id="quantity"
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">{t("serviceSelector.notes")}</Label>
                        <Textarea
                          id="notes"
                          placeholder={t("serviceSelector.notesPlaceholder")}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={3}
                        />
                      </div>
                      <Button onClick={saveServiceEdit} className="w-full">
                        <Edit2 className="h-4 w-4 mr-2" />
                        {t("serviceSelector.save")}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>{t("serviceSelector.total")}:</span>
                <span className="text-primary">
                  {formatMoney(calculateTotal(), { includeCode: false })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
