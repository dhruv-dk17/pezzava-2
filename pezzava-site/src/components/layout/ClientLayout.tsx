"use client";

import dynamic from "next/dynamic";
import React from "react";

const Header = dynamic(() => import("@/components/layout/Header"), { ssr: false });
const PageWrapper = dynamic(() => import("@/components/layout/PageWrapper"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <Header />
      <main className="flex-1 flex flex-col">
        <PageWrapper>
          {children}
        </PageWrapper>
      </main>
    </>
  );
}
