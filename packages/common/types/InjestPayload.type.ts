export type InjestPayload = {
   timestamp: string;
   source: string;
   type: number;
   name: string;
   message: string;
   level?: string;
   environment?: string;
   stacktrace?: StacktraceFrame[];
   tags?: string[];
   user?: Record<any, any>;
   extra?: Record<any, any>;
   device?: DeviceInfo;
   breadcrumbs?: Record<any, any>[];
}


export interface StacktraceFrame {
   functionName: string;
   fileName: string;
   lineNumber: number;
   columnNumber: number;
   source: SourceCodeContext[] | null;
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