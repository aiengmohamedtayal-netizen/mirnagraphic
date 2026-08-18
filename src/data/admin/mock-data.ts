import type {
  AdminKpi,
  Client,
  InventoryItem,
  ProductionOrder,
  Project,
  QuoteRequest,
  ReportMetric,
} from "@/types/admin";

export const adminKpis: AdminKpi[] = [
  { label: "Open quote requests", value: "24", detail: "6 need review today", trend: "+12.5%", tone: "blue" },
  { label: "Active production", value: "18", detail: "4 lines running now", trend: "+8.2%", tone: "green" },
  { label: "Projects due this week", value: "07", detail: "2 require attention", trend: "On track", tone: "gold" },
  { label: "Inventory alerts", value: "03", detail: "Raw material watchlist", trend: "-2 since Monday", tone: "amber" },
];

export const quoteRequests: QuoteRequest[] = [
  { id: "QR-2048", client: "Nile Harvest Foods", type: "FMCG folding cartons", volume: "120,000 units", status: "new", received: "Today, 09:42", owner: "Sales desk" },
  { id: "QR-2047", client: "Cairo Atelier", type: "Rigid magnetic boxes", volume: "18,500 units", status: "review", received: "Today, 08:15", owner: "M. Hassan" },
  { id: "QR-2046", client: "Delta Pharma", type: "Braille cartons", volume: "240,000 units", status: "quoted", received: "Yesterday", owner: "R. Adel" },
  { id: "QR-2045", client: "Eastline Apparel", type: "Textile presentation boxes", volume: "42,000 units", status: "review", received: "Yesterday", owner: "S. Omar" },
  { id: "QR-2044", client: "Orbital Retail", type: "E-commerce mailers", volume: "75,000 units", status: "closed", received: "18 Jun 2026", owner: "Sales desk" },
];

export const projects: Project[] = [
  { id: "PR-118", name: "Harvest Essentials", client: "Nile Harvest Foods", stage: "Die-cutting", progress: 68, due: "24 Jun", status: "active" },
  { id: "PR-117", name: "Atelier Season 04", client: "Cairo Atelier", stage: "Sample approval", progress: 42, due: "26 Jun", status: "review" },
  { id: "PR-116", name: "CardioCare Export", client: "Delta Pharma", stage: "Quality control", progress: 91, due: "21 Jun", status: "active" },
  { id: "PR-115", name: "Eastline Core Range", client: "Eastline Apparel", stage: "Delivered", progress: 100, due: "18 Jun", status: "delivered" },
  { id: "PR-114", name: "Orbital Launch Mailer", client: "Orbital Retail", stage: "Material hold", progress: 24, due: "28 Jun", status: "blocked" },
];

export const productionOrders: ProductionOrder[] = [
  { id: "PO-8812", project: "Harvest Essentials", line: "Offset line 02", stage: "printing", progress: 62, quantity: "86k / 120k", due: "24 Jun", quality: "passed" },
  { id: "PO-8811", project: "CardioCare Export", line: "Finishing line 01", stage: "quality", progress: 91, quantity: "238k / 240k", due: "21 Jun", quality: "monitor" },
  { id: "PO-8810", project: "Atelier Season 04", line: "Pre-press studio", stage: "prepress", progress: 42, quantity: "3 / 7 SKUs", due: "26 Jun", quality: "pending" },
  { id: "PO-8809", project: "Eastline Core Range", line: "Folder-gluer 03", stage: "ready", progress: 100, quantity: "42k / 42k", due: "18 Jun", quality: "passed" },
];

export const inventoryItems: InventoryItem[] = [
  { id: "INV-001", name: "FBB board 350 gsm", category: "Board", stock: "18.4 t", level: 82, status: "healthy", updated: "12 min ago" },
  { id: "INV-002", name: "Kraft liner 180 gsm", category: "Corrugated", stock: "6.1 t", level: 48, status: "watch", updated: "28 min ago" },
  { id: "INV-003", name: "Soft-touch laminate", category: "Finishing", stock: "1,240 m", level: 22, status: "critical", updated: "41 min ago" },
  { id: "INV-004", name: "Hot foil — warm gold", category: "Finishing", stock: "14 rolls", level: 36, status: "watch", updated: "1 hr ago" },
  { id: "INV-005", name: "Water-based adhesive", category: "Consumables", stock: "420 kg", level: 74, status: "healthy", updated: "2 hrs ago" },
];

export const clients: Client[] = [
  { id: "CL-201", name: "Nile Harvest Foods", sector: "Food & Beverage", projects: 8, contact: "procurement@nileharvest.eg", lastActivity: "Today, 09:42" },
  { id: "CL-202", name: "Delta Pharma", sector: "Pharmaceuticals", projects: 5, contact: "supply@deltapharma.eg", lastActivity: "Today, 08:15" },
  { id: "CL-203", name: "Cairo Atelier", sector: "Textiles & Garments", projects: 3, contact: "studio@cairoatelier.co", lastActivity: "Yesterday" },
  { id: "CL-204", name: "Orbital Retail", sector: "Retail & FMCG", projects: 4, contact: "ops@orbitalretail.com", lastActivity: "18 Jun 2026" },
];

export const reportMetrics: ReportMetric[] = [
  { label: "Quote-to-project conversion", value: "38.4%", delta: "+4.8% vs last month", direction: "up" },
  { label: "On-time delivery", value: "96.2%", delta: "+1.4% vs last month", direction: "up" },
  { label: "Quality pass rate", value: "99.1%", delta: "Stable this month", direction: "flat" },
  { label: "Material variance", value: "2.8%", delta: "-0.6% vs last month", direction: "down" },
];

export const productionStages = [
  { label: "Pre-press", value: 18, color: "bg-[#8AA9C2]" },
  { label: "Printing", value: 34, color: "bg-[#0F4C81]" },
  { label: "Finishing", value: 26, color: "bg-[#D4AF37]" },
  { label: "Quality", value: 14, color: "bg-[#4F8A70]" },
  { label: "Ready", value: 8, color: "bg-[#A8B4C0]" },
];

export const activityFeed = [
  { title: "CardioCare Export cleared inline inspection", detail: "PO-8811 · Quality control", time: "12 min ago", tone: "green" },
  { title: "New quote request received from Nile Harvest Foods", detail: "QR-2048 · 120,000 units", time: "38 min ago", tone: "blue" },
  { title: "Soft-touch laminate moved to watchlist", detail: "INV-003 · 22% remaining", time: "41 min ago", tone: "amber" },
];
