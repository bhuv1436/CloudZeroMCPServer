export interface Logger {
  debug(message: string, context?: unknown): void;
  info(message: string, context?: unknown): void;
  warn(message: string, context?: unknown): void;
  error(message: string, context?: unknown): void;
}

export class ConsoleLogger implements Logger {
  private isDebugEnabled: boolean;

  constructor(debugMode: boolean = process.env.DEBUG === 'true') {
    this.isDebugEnabled = debugMode;
  }

  debug(message: string, context?: unknown): void {
    if (this.isDebugEnabled) {
      this.log('DEBUG', message, context);
    }
  }

  info(message: string, context?: unknown): void {
    this.log('INFO', message, context);
  }

  warn(message: string, context?: unknown): void {
    this.log('WARN', message, context);
  }

  error(message: string, context?: unknown): void {
    this.log('ERROR', message, context);
  }

  private log(level: string, message: string, context?: unknown): void {
    const timestamp = new Date().toISOString();
    const logEntry: Record<string, unknown> = {
      timestamp,
      level,
      message,
    };
    
    if (context) {
      logEntry.context = context;
    }
    
    // Use stderr to avoid interfering with MCP protocol on stdout
    console.error(JSON.stringify(logEntry));
  }
}

// Default logger instance
export const logger = new ConsoleLogger();