export interface AuthUser {
  userId: string;
  role: string;
  email: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  origin?: string | null;
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
}

export interface Quote {
  id: string;
  clientId: string;
  total: number;
  status: string;
  createdAt: string;
  client: Client;
  quoteService: Array<{
    id: string;
    serviceId: string;
    price: number;
    service: Service;
  }>;
}

export interface Payment {
  id: string;
  quoteId: string;
  stripeId: string;
  amount: number;
  status: "pending" | "paid" | "failed";
  createdAt: string;
  quote: Quote;
}
