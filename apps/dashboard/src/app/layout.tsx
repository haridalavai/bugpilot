import { Geist, Geist_Mono } from "next/font/google";

import "@bugpilot/ui/globals.css";

import { Button } from "@bugpilot/ui/components/button";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});
import { ErrorTracker } from "@bugpilot/web";
import RootLayout from "../components/root-layout";

// Initialize in your app's entry point
const bugpilot = ErrorTracker.getInstance(
  "lg_test_b61a7c58-30bc-4b0d-9233-ddb3fc37017a",
  {
    environment: process.env.NODE_ENV,
    debug: process.env.NODE_ENV === "development",
    tags: {
      web: "true",
    },
    transport: {
      endpoint:
        "http://localhost:3002/ingest/94fca20f-edee-4b1e-ad86-e13a58ecd390",
    },
  }
);

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <RootLayout>{children}</RootLayout>
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
