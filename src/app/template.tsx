"use client"

import { AuthProvider } from "@/app/context/authcontext";

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}