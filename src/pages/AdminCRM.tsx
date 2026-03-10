import { FormEvent, useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type { Client, Service, Quote } from "@/types/saas";

export default function AdminCRM() {
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);

  const [clientForm, setClientForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    origin: "site",
  });

  const [quoteClientId, setQuoteClientId] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [items, setItems] = useState<Array<{ serviceId: string; name: string; price: number }>>([]);

  const load = async () => {
    const [clientsData, servicesData, quotesData] = await Promise.all([
      api.get<Client[]>("/api/clients"),
      api.get<Service[]>("/api/services"),
      api.get<Quote[]>("/api/quotes"),
    ]);
    setClients(clientsData);
    setServices(servicesData);
    setQuotes(quotesData);
  };

  useEffect(() => {
    load().catch((error) =>
      toast({
        title: "Erro ao carregar CRM",
        description: error instanceof Error ? error.message : "Tente novamente.",
        variant: "destructive",
      }),
    );
  }, [toast]);

  const total = useMemo(() => items.reduce((sum, item) => sum + item.price, 0), [items]);

  const submitClient = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await api.post("/api/clients", {
        ...clientForm,
        phone: clientForm.phone || null,
        company: clientForm.company || null,
      });
      setClientForm({ name: "", email: "", phone: "", company: "", origin: "site" });
      await load();
      toast({ title: "Cliente criado com sucesso." });
    } catch (error) {
      toast({
        title: "Erro ao criar cliente",
        description: error instanceof Error ? error.message : "Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const addService = (serviceId: string) => {
    const found = services.find((item) => item.id === serviceId);
    if (!found) return;
    if (items.some((item) => item.serviceId === serviceId)) return;
    setItems((current) => [...current, { serviceId: found.id, name: found.name, price: found.price }]);
  };

  const submitQuote = async (status: "rascunho" | "enviado") => {
    if (!quoteClientId || items.length === 0) {
      toast({ title: "Selecione cliente e serviços.", variant: "destructive" });
      return;
    }
    try {
      await api.post("/api/quotes", {
        clientId: quoteClientId,
        status,
        items: items.map((item) => ({ serviceId: item.serviceId, price: item.price })),
      });
      setQuoteClientId("");
      setItems([]);
      await load();
      toast({ title: "Orçamento salvo." });
    } catch (error) {
      toast({
        title: "Erro ao salvar orçamento",
        description: error instanceof Error ? error.message : "Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">CRM</h1>
      <div className="grid xl:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle>Novo cliente</CardTitle></CardHeader>
          <CardContent>
            <form className="space-y-3" onSubmit={submitClient}>
              <Input placeholder="Nome" value={clientForm.name} onChange={(e) => setClientForm((f) => ({ ...f, name: e.target.value }))} required />
              <Input placeholder="Email" type="email" value={clientForm.email} onChange={(e) => setClientForm((f) => ({ ...f, email: e.target.value }))} required />
              <Input placeholder="Telefone" value={clientForm.phone} onChange={(e) => setClientForm((f) => ({ ...f, phone: e.target.value }))} />
              <Input placeholder="Empresa" value={clientForm.company} onChange={(e) => setClientForm((f) => ({ ...f, company: e.target.value }))} />
              <Input placeholder="Origem" value={clientForm.origin} onChange={(e) => setClientForm((f) => ({ ...f, origin: e.target.value }))} />
              <Button type="submit">Cadastrar cliente</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Novo orçamento</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Select value={quoteClientId} onValueChange={setQuoteClientId}>
              <SelectTrigger><SelectValue placeholder="Selecione o cliente" /></SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedService} onValueChange={(value) => { setSelectedService(value); addService(value); }}>
              <SelectTrigger><SelectValue placeholder="Adicionar serviço" /></SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name} - R$ {service.price.toLocaleString("pt-BR")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="space-y-2 max-h-40 overflow-auto">
              {items.map((item) => (
                <div key={item.serviceId} className="border rounded-md p-2 flex justify-between items-center">
                  <span>{item.name}</span>
                  <Input
                    type="number"
                    className="w-32"
                    value={item.price}
                    onChange={(e) =>
                      setItems((current) =>
                        current.map((entry) =>
                          entry.serviceId === item.serviceId
                            ? { ...entry, price: Number(e.target.value) }
                            : entry,
                        ),
                      )
                    }
                  />
                </div>
              ))}
            </div>
            <p className="font-semibold">Total: R$ {total.toLocaleString("pt-BR")}</p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => submitQuote("rascunho")}>Salvar rascunho</Button>
              <Button onClick={() => submitQuote("enviado")}>Salvar e enviar</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Clientes e histórico de orçamentos</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {clients.map((client) => {
            const clientQuotes = quotes.filter((quote) => quote.clientId === client.id);
            return (
              <div key={client.id} className="border rounded-lg p-3">
                <p className="font-medium">{client.name}</p>
                <p className="text-sm text-muted-foreground">{client.email} · {client.phone || "Sem telefone"}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {clientQuotes.length} orçamento(s)
                </p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
