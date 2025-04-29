export interface BaseEvent {
  timestamp: string;
  sessionId: string;
  projectId: string;
  source: string;
  message: string;
  environment: string;
  user: ISessionUser;
}


export interface ISessionUser {
  name?: string;
  email: string;
  image?: string;
  moreInfo?: Record<any, any>;
}
