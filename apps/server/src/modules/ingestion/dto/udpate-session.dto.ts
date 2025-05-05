import { ISessionUser, UpdateSessionPayload } from "@bugpilot/common";

export class UpdateSessionDto implements UpdateSessionPayload {
 data: Record<string, any>;
 sessionId: string;
 status: string;
 timestamp: string;
 projectId: string;
 source: string;
 user: ISessionUser;
 environment: string;
 message: string;
 startTime?: string;
 endTime?: string;
}