import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // Handle MySQL duplicate entry error
    if (exception.code === 'ER_DUP_ENTRY') {
      response.status(409).json({
        statusCode: 409,
        message: 'Email already exists',
        error: 'Conflict',
      });
      return;
    }

    // Default behavior for unhandled exceptions
    response.status(500).json({
      statusCode: 500,
      message: exception.message || 'Internal server error',
      error: 'Internal Server Error',
    });
  }
}
