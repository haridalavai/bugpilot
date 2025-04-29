import { IncomingEvent, ErrorPayload } from "@bugpilot/common";

export interface TransportOptions {
    endpoint?: string;
    headers?: Record<string, string>;
    debug?: boolean;
}

export class Transport {
    private apiKey: string;
    private endpoint: string;
    private headers: Record<string, string>;
    private debug: boolean;
    private isErrorReporting: boolean = false;

    constructor(apiKey: string, options: TransportOptions = {}) {
        this.apiKey = apiKey;
        this.endpoint = options.endpoint || 'https://api.bugpilot.com/errors';
        this.debug = options.debug || false;
        this.headers = {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
            ...options.headers
        };
    }

    public async sendError(report: ErrorPayload): Promise<void> {
        if (this.isErrorReporting) {
            if (this.debug) {
                console.warn('Prevented recursive error reporting');
            }
            return;
        }

        try {
            this.isErrorReporting = true;

            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    eventType: 'error',
                    payload: {
                        ...report,
                    },
                })
            });

            if (!response.ok) {
                if (this.debug) {
                    console.error(`Failed to send error report: ${response.statusText}`);
                }
                return;
            }

            if (this.debug) {
                console.log('Error report sent successfully:', report);
            }
        } catch (error) {
            if (this.debug) {
                console.error('Failed to send error report:', error);
            }
        } finally {
            this.isErrorReporting = false;
        }
    }

    public setEndpoint(endpoint: string): void {
        this.endpoint = endpoint;
    }

    public setHeaders(headers: Record<string, string>): void {
        this.headers = {
            ...this.headers,
            ...headers
        };
    }
}