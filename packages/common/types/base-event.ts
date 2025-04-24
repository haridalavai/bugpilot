export type BaseEvent = {
  timestamp: string;
  sessionId: string;
  projectId: string;
  source: string;
  message: string;
  environment: string;
  user: SessionUser;
};


export type SessionUser = {
  name?: string;
  email: string;
  image?: string;
  moreInfo?: Record<any, any>;
};
