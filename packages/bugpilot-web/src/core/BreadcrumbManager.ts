export interface BreadcrumbOptions {
  type: string;
  category: string;
  message?: string;
  data?: Record<string, any>;
  level?: 'info' | 'warning' | 'error';
}

export class BreadcrumbManager {
  private breadcrumbs: Array<BreadcrumbOptions & { timestamp: string }> = [];
  private maxBreadcrumbs: number;

  constructor(maxBreadcrumbs: number = 100) {
    this.maxBreadcrumbs = maxBreadcrumbs;
  }

  public addBreadcrumb(breadcrumb: BreadcrumbOptions): void {
    const enhancedBreadcrumb = {
      ...breadcrumb,
      timestamp: new Date().toISOString()
    };

    this.breadcrumbs.push(enhancedBreadcrumb);

    // Maintain max breadcrumbs limit
    if (this.breadcrumbs.length > this.maxBreadcrumbs) {
      this.breadcrumbs.shift();
    }
  }

  public getBreadcrumbs(): Array<BreadcrumbOptions & { timestamp: string }> {
    return this.breadcrumbs;
  }

  public clearBreadcrumbs(): void {
    this.breadcrumbs = [];
  }

  public setMaxBreadcrumbs(max: number): void {
    this.maxBreadcrumbs = max;
    // Trim existing breadcrumbs if they exceed the new max
    if (this.breadcrumbs.length > max) {
      this.breadcrumbs = this.breadcrumbs.slice(-max);
    }
  }

  public addConsoleLogBreadcrumb(level: 'info' | 'warning' | 'error', args: any[]): void {
    this.addBreadcrumb({
      type: 'console',
      category: 'console',
      level,
      message: args.map(arg => 
        typeof arg === 'string' ? arg : JSON.stringify(arg)
      ).join(' '),
      data: { arguments: args }
    });
  }

  public addNavigationBreadcrumb(from: string, to: string): void {
    this.addBreadcrumb({
      type: 'navigation',
      category: 'navigation',
      message: `Navigation from ${from} to ${to}`,
      data: { from, to }
    });
  }

  public addClickBreadcrumb(element: string, id?: string): void {
    this.addBreadcrumb({
      type: 'user',
      category: 'click',
      message: `Click on ${element}${id ? ` (${id})` : ''}`,
      data: { element, id }
    });
  }
} 