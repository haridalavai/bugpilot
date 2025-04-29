import { BaseEvent} from "./base-event";

export interface ErrorPayload extends BaseEvent {
  level: string;
  environment: string;
  timestamp: string;
  sessionId: string;
  projectId: string;
  source: string;
  message: string;
  stacktrace: IStacktraceFrame[];
  tags: string[];
  extra: Record<any, any>;
  device: DeviceInfo;
  breadcrumbs: Record<any, any>[];
}

export interface IStacktraceFrame {
  functionName: string;
  fileName: string;
  lineNumber: number;
}

export interface SourceCodeContext {
  line: string;
  content: string;
}

export interface DeviceInfo {
  browser: {
    name: string;
    version: string;
    language: string;
  };
  os: {
    name: string;
    version: string;
  };
  screen: {
    width: number;
    height: number;
    colorDepth: number;
    orientation: string;
  };
  viewport: {
    width: number;
    height: number;
  };
  memory?: number;
  cpu?: {
    cores: number;
    architecture: string;
  };
}
