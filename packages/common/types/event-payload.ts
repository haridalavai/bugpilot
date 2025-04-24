import { BaseEvent } from "./base-event";

export type EventPayload = BaseEvent & {
  timestamp: string;
};

