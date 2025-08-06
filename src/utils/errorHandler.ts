interface ErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
  path?: string;
}

interface SanitizedError {
  userMessage: string;
  technicalMessage?: string;
  shouldLog: boolean;
}

export class ErrorHandler {
  private static readonly ERROR_MAP: Record<string, string> = {
    // Network errors
    'ERR_NETWORK': 'Network error: Please check your internet connection and try again.',
    'Network Error': 'Network error: Please check your internet connection and try again.',
    'timeout': 'Request timed out. Please try again.',
    
    // HTTP status codes
    '400': 'Invalid request. Please check your input and try again.',
    '401': 'Please log in to continue.',
    '403': 'You don\'t have permission to perform this action.',
    '404': 'The requested resource was not found.',
    '409': 'This resource already exists.',
    '422': 'Invalid data provided. Please check your input.',
    '429': 'Too many requests. Please wait a moment and try again.',
    '500': 'Server error. Please try again later.',
    '502': 'Service temporarily unavailable. Please try again later.',
    '503': 'Service temporarily unavailable. Please try again later.',
    
    // Common API errors
    'postcode_not_found': 'Sorry, this postcode is not in our service area.',
    'invalid_postcode': 'Please enter a valid UK postcode.',
    'booking_not_found': 'Booking not found.',
    'schedule_not_found': 'Schedule not found.',
    'user_not_found': 'User not found.',
    'payment_failed': 'Payment failed. Please try again.',
    'invalid_token': 'Your session has expired. Please log in again.',
    'token_expired': 'Your session has expired. Please log in again.',
    
    // Database errors
    'duplicate_key': 'This record already exists.',
    'validation_failed': 'Please check your input and try again.',
    
    // Generic fallbacks
    'default': 'Something went wrong. Please try again.',
    'unknown': 'An unexpected error occurred. Please try again.'
  };

  private static readonly TECHNICAL_ERRORS = [
    'Cannot PATCH',
    'Cannot GET',
    'Cannot POST',
    'Cannot DELETE',
    'Cannot PUT',
    'ENOTFOUND',
    'ECONNREFUSED',
    'ETIMEDOUT',
    'MongoError',
    'ValidationError',
    'CastError',
    'SyntaxError'
  ];

  static sanitizeError(error: any): SanitizedError {
    const errorResponse = error?.response;
    const statusCode = errorResponse?.status;
    const originalMessage = errorResponse?.data?.message || error?.message || 'Unknown error';
    
    // Check if it's a technical error that should be hidden
    const isTechnicalError = this.TECHNICAL_ERRORS.some(techError => 
      originalMessage.includes(techError)
    );

    if (isTechnicalError) {
      return {
        userMessage: this.ERROR_MAP[statusCode?.toString() || 'default'],
        technicalMessage: originalMessage,
        shouldLog: true
      };
    }

    // Check for known error patterns
    const knownError = this.ERROR_MAP[originalMessage.toLowerCase()];
    if (knownError) {
      return {
        userMessage: knownError,
        technicalMessage: originalMessage,
        shouldLog: false
      };
    }

    // Check for status code based messages
    if (statusCode && this.ERROR_MAP[statusCode.toString()]) {
      return {
        userMessage: this.ERROR_MAP[statusCode.toString()],
        technicalMessage: originalMessage,
        shouldLog: true
      };
    }

    // Check for network errors
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      return {
        userMessage: this.ERROR_MAP['ERR_NETWORK'],
        technicalMessage: originalMessage,
        shouldLog: false
      };
    }

    // Default fallback
    return {
      userMessage: this.ERROR_MAP['default'],
      technicalMessage: originalMessage,
      shouldLog: true
    };
  }

  static logError(error: any, context?: string): void {
    const sanitized = this.sanitizeError(error);
    
    if (sanitized.shouldLog) {
      console.error(`[${context || 'ErrorHandler'}] Technical Error:`, {
        userMessage: sanitized.userMessage,
        technicalMessage: sanitized.technicalMessage,
        originalError: error,
        timestamp: new Date().toISOString()
      });
    }
  }

  static getErrorMessage(error: any, context?: string): string {
    const sanitized = this.sanitizeError(error);
    this.logError(error, context);
    return sanitized.userMessage;
  }
}

export default ErrorHandler; 