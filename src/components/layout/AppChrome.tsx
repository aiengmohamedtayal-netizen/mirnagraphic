"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import ReadingProgress from "@/components/ui/ReadingProgress";
import LocationFooter from "@/components/sections/LocationFooter";
import AIAssistant from "@/components/ai/AIAssistant";

export default function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  return (
    <>
      {!isAdminRoute && <ReadingProgress />}
      {!isAdminRoute && <Navbar />}
      <main id="main-content">{children}</main>
      {!isAdminRoute && <LocationFooter />}
      {!isAdminRoute && <AIAssistant mode="public" />}
    </>
  );
}
