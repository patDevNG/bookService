import {
  createLogger,
  transports,
  format,
  Logger,
  LoggerOptions,
} from 'winston'

export class LogHelper {
  private readonly logger: Logger

  constructor() {
    const logConfigurations: LoggerOptions = {
      format: format.combine(
        format.colorize({ all: true }),
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level}: ${message}`
        })
      ),
      transports: [new transports.Console()],
    }

    this.logger = createLogger(logConfigurations)
  }

  info(message: string): void {
    this.logger.log({
      level: 'info',
      message: JSON.stringify(message),
    })
  }

  error(message: string): void {
    this.logger.log({
      level: 'error',
      message: JSON.stringify(message),
    })
  }
}

export default new LogHelper()
