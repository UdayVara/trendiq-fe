"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

function NextAuthProvider({
  session,
  children,
}: {
  session: Session | null | undefined;
  children: React.ReactNode;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default NextAuthProvider;
