export type AdminLocale = "en" | "ar";

export type QuoteStatus = "new" | "review" | "quoted" | "closed";
export type ProjectStatus = "active" | "review" | "delivered" | "blocked";
export type ProductionStatus = "prepress" | "printing" | "finishing" | "quality" | "ready";
export type StockStatus = "healthy" | "watch" | "critical";

export interface AdminKpi {
  label: string;
  value: string;
  detail: string;
  trend: string;
  tone: "blue" | "gold" | "green" | "amber";
}

export interface QuoteRequest {
  id: string;
  client: string;
  type: string;
  volume: string;
  status: QuoteStatus;
  received: string;
  owner: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  stage: string;
  progress: number;
  due: string;
  status: ProjectStatus;
}

export interface ProductionOrder {
  id: string;
  project: string;
  line: string;
  stage: ProductionStatus;
  progress: number;
  quantity: string;
  due: string;
  quality: "passed" | "monitor" | "pending";
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: string;
  level: number;
  status: StockStatus;
  updated: string;
}

export interface Client {
  id: string;
  name: string;
  sector: string;
  projects: number;
  contact: string;
  lastActivity: string;
}

export interface ReportMetric {
  label: string;
  value: string;
  delta: string;
  direction: "up" | "down" | "flat";
}
