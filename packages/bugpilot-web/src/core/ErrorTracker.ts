import { ErrorPayload, IStacktraceFrame, ISessionUser } from "@bugpilot/common";
import { getDeviceInfo } from "../utils/deviceInfo";
import { BreadcrumbManager } from "./BreadcrumbManager";
import { Transport, TransportOptions } from "./Transport";
import { parseStackTrace } from "../utils/stackTraceParser";
import { v4 as uuidv4 } from "uuid";

interface ErrorTrackerOptions {
  environment?: string;
  sessionId?: string;
  user?: ISessionUser;
  release?: string;
  maxBreadcrumbs?: number;
  beforeSend?: (error: Error) => Error | null;
  ignoreErrors?: Array<string | RegExp>;
  tags?: string[];
  debug?: boolean;
  transport?: TransportOptions;
}

class ErrorTracker {
  private static instance: ErrorTracker;
  private apiKey: string;
  private projectId: string;
  private options: ErrorTrackerOptions;
  private breadcrumbManager: BreadcrumbManager;
  private transport: Transport;

  private constructor(apiKey: string, projectId: string, options?: ErrorTrackerOptions) {
    this.apiKey = apiKey;
    this.projectId = projectId;
    this.options = options || {};

    this.breadcrumbManager = new BreadcrumbManager(this.options.maxBreadcrumbs);
    this.transport = new Transport(this.apiKey, {
      debug: this.options.debug,
      ...this.options.transport,
    });

    this.init();
  }

  private init(): void {
    if (typeof window !== "undefined") {
      window.onerror = (message, source, lineno, colno, error) => {
        this.captureError(error || message);
      };

      window.onunhandledrejection = (event) => {
        this.captureError(event.reason);
      };

      if (this.options.debug) {
        console.log("BugPilot initialized with options:", this.options);
      }
    }
  }

  public async captureError(
    error: Error | string | Event,
    context?: Record<string, any>
  ): Promise<void> {
    // Ignore errors that come from our own SDK's reporting
    if (
      error instanceof Error &&
      error.message.includes("Failed to send error report")
    ) {
      if (this.options.debug) {
        console.warn(
          "Ignored error from error reporting service:",
          error.message
        );
      }
      return;
    }

    const errorObject =
      error instanceof Error ? error : new Error(String(error));

    if (this.shouldIgnoreError(errorObject)) {
      return;
    }

    if (this.options.beforeSend) {
      const modifiedError = this.options.beforeSend(errorObject);
      if (!modifiedError) return;
    }

    const stackFrames: IStacktraceFrame[] = await parseStackTrace(errorObject);

    const errorReport: ErrorPayload = {
      message: errorObject.message,
      timestamp: Date.now().toString(),
      stacktrace: stackFrames,
      source: "web",
      device: getDeviceInfo(),
      tags: this.options.tags ? Object.values(this.options.tags) : [],
      breadcrumbs: this.breadcrumbManager.getBreadcrumbs(),
      level: "error",
      environment: this.options.environment || "development",
      projectId: this.projectId,
      sessionId: this.options.sessionId || uuidv4(),
      user: this.options.user || {
        email: "anonymous@bugpilot.com",
        name: "Anonymous",
      },
      extra: {
        ...context,
      },
    };

    this.transport.sendError(errorReport);
  }

  private shouldIgnoreError(error: Error): boolean {
    if (!this.options.ignoreErrors) return false;

    return this.options.ignoreErrors.some((pattern) => {
      if (pattern instanceof RegExp) {
        return pattern.test(error.message);
      }
      return error.message.includes(pattern);
    });
  }

  public static getInstance(
    apiKey: string,
    projectId: string,
    options?: ErrorTrackerOptions
  ): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker(apiKey, projectId, options);
    }
    return ErrorTracker.instance;
  }
}

export { ErrorTracker, type ErrorTrackerOptions };
