import { BaseEvent} from "./base-event";

export interface UpdateSessionPayload extends BaseEvent {
  sessionId: string;
  status: string;
  startTime?: string;
  endTime?: string;
}

