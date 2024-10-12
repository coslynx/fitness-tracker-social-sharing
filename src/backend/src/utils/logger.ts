import { createLogger, format, transports } from 'winston';

// Specify the exact version of winston to use (e.g., '3.8.2').
const winstonVersion = '3.8.2';

// Define a custom logger configuration based on the MVP's requirements.
const loggerConfig = {
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  transports: [
    // Use a console transport for development and debugging purposes.
    new transports.Console({
      level: 'debug', // Specify a different log level for the console transport if needed (e.g., 'info').
    }),
    // Consider using a file transport to persist logs for analysis and debugging.
    // new transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Use a rotating file transport for production, to avoid file size limitations.
    // new transports.DailyRotateFile({ filename: 'logs/combined.log', datePattern: 'YYYY-MM-DD', maxSize: '20m', maxFiles: '14d' }),
  ],
};

// Create a new logger instance with the defined configuration.
const logger = createLogger(loggerConfig);

// Export the logger instance for use in other files and modules.
export default logger;