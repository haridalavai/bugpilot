"use client";

import { Button } from "@bugpilot/ui/components/button";
import { ErrorTracker } from "@bugpilot/web";

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

export default function Page() {
  return (
    <Button onClick={() => bugpilot.captureError(new Error("Test error"))}>
      Click me
    </Button>
  );
}
