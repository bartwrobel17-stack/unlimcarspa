import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } } : {}),
  title: "UNLIM CAR SPA | Auto detailing Lubin",
  description: "UNLIM CAR SPA w Lubinie. Pielęgnacja samochodu, polerowanie lakieru i pranie tapicerki. Umów wizytę online.",
  openGraph: { title: "UNLIM CAR SPA | Auto detailing Lubin", description: "Zadbaj o auto z UNLIM CAR SPA w Lubinie.", type: "website", locale: "pl_PL" },
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pl"><body>{children}</body></html>;
}
