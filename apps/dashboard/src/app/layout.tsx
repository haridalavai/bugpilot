import { Geist, Geist_Mono } from "next/font/google";
import "@bugpilot/ui/globals.css";
import { Button } from "@bugpilot/ui/components/button";
import { ErrorTracker } from "@bugpilot/web";
import RootLayout from "../components/root-layout";
import { Providers } from "../components/providers";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Initialize in your app's entry point
const bugpilot = ErrorTracker.getInstance(
  "lg_test-app_bb07f668-ae6d-4fd4-8c70-e1d55ec437a8",
  "94f09a45-9398-45b7-9847-1d8c2850e3ca",
  {
    environment: "development",
    tags: ["web"],
    transport: {
      endpoint: "http://localhost:3002/ingest/94f09a45-9398-45b7-9847-1d8c2850e3ca",
    },
  },
);

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Providers>
          <RootLayout>
            {children}
          </RootLayout>
        </Providers>
        {/* <Button
          onClick={() => bugpilot.captureError(new Error("Test error"))}
          className="fixed right-5 bottom-5 z-50"
        >
          Test error
        </Button> */}
      </body>
    </html>
  );
}