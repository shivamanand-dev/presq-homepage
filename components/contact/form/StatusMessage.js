'use client';

import { CheckCircle, AlertCircle } from 'lucide-react';

export default function StatusMessage({ status, message }) {
  if (!status || !message) return null;

  const isSuccess = status === 'success';
  const isError = status === 'error';

  if (isSuccess) {
    return (
      <div
        className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start space-x-3"
        role="alert"
        aria-live="polite"
      >
        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-green-800 font-semibold mb-1">Message Sent Successfully!</h3>
          <p className="text-green-700 text-sm">{message}</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3"
        role="alert"
        aria-live="polite"
      >
        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-red-800 font-semibold mb-1">Message Failed to Send</h3>
          <p className="text-red-700 text-sm">{message}</p>
        </div>
      </div>
    );
  }

  return null;
}
