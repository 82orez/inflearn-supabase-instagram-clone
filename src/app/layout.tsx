import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/app/material-tailwind-theme-provider";
import ReactQueryProvider from "@/app/react-query-provider";
import RecoilRootWrapper from "@/app/recoilWrapper";
import MainLayout from "@/components/main-layout-page/main-layout";
import AuthPage from "../components/auth-page";
import { createClient } from "@/utils/supabase/server";
import AuthProvider from "@/config/auth-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("session: ", session);

  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider accessToken={session?.access_token}>
          <ReactQueryProvider>
            <RecoilRootWrapper>
              <ThemeProvider>{session?.user ? <MainLayout>{children}</MainLayout> : <AuthPage />}</ThemeProvider>
            </RecoilRootWrapper>
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
