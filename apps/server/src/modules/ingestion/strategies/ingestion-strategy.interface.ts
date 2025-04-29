import { IncomingEvent } from "@bugpilot/common";

export interface IngestionStrategy {
    process(payload: IncomingEvent): Promise<any>;
  }
  