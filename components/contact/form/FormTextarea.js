'use client';

import { AlertTriangle, CheckCircle } from 'lucide-react';

export default function FormTextarea({
  id,
  name,
  label,
  value,
  onChange,
  error,
  required = false,
  rows = 4,
  placeholder,
  maxLength,
  showCharCount = false,
  minLength,
  showWordCount = false,
  className = '',
}) {
  const charCount = value.length;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const minWords = 4; // Minimum word requirement
  const minChars = minLength || 10; // Minimum character requirement

  const isMinCharsMet = charCount >= minChars;
  const isMinWordsMet = wordCount >= minWords;
  const isRequirementMet = isMinCharsMet && isMinWordsMet;

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}{' '}
        {required && (
          <span className="text-red-500" aria-label="required">
            *
          </span>
        )}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        maxLength={maxLength}
        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors duration-200 resize-vertical ${
          error
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
        }`}
        placeholder={placeholder}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? 'true' : 'false'}
      />

      {/* Character/Word Count and Requirements */}
      <div className="mt-2 space-y-2">
        {/* Count Display */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            {/* Character Count */}
            <div
              className={`flex items-center space-x-1 ${
                isMinCharsMet ? 'text-green-600' : 'text-orange-600'
              }`}
            >
              {isMinCharsMet ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <AlertTriangle className="w-4 h-4" />
              )}
              <span className="font-medium">
                {charCount} characters
                {!isMinCharsMet && <span className="text-gray-500"> (min {minChars})</span>}
              </span>
            </div>

            {/* Word Count */}
            <div
              className={`flex items-center space-x-1 ${
                isMinWordsMet ? 'text-green-600' : 'text-orange-600'
              }`}
            >
              {isMinWordsMet ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <AlertTriangle className="w-4 h-4" />
              )}
              <span className="font-medium">
                {wordCount} words
                {!isMinWordsMet && <span className="text-gray-500"> (min {minWords})</span>}
              </span>
            </div>
          </div>

          {/* Max Length Display */}
          {showCharCount && maxLength && (
            <div
              className={`text-sm ${
                charCount > maxLength * 0.9 ? 'text-orange-600' : 'text-gray-500'
              }`}
            >
              {charCount}/{maxLength}
            </div>
          )}
        </div>

        {/* Requirement Status */}
        {!isRequirementMet && charCount > 0 && (
          <div className="flex items-start space-x-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-orange-800">
              <p className="font-medium mb-1">Message requirements:</p>
              <ul className="space-y-1 text-xs">
                {!isMinCharsMet && (
                  <li>
                    • At least {minChars} characters ({minChars - charCount} more needed)
                  </li>
                )}
                {!isMinWordsMet && (
                  <li>
                    • At least {minWords} words ({minWords - wordCount} more needed)
                  </li>
                )}
              </ul>
              <p className="mt-2 text-xs text-orange-700">
                Please provide more details about your project, requirements, timeline, and any
                specific questions you have.
              </p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {isRequirementMet && (
          <div className="flex items-center space-x-2 p-2 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-800 font-medium">
              Great! Your message meets all requirements.
            </span>
          </div>
        )}
      </div>

      {showCharCount && maxLength && (
        <div className="mt-1 text-sm text-gray-500">
          {value.length}/{maxLength} characters
        </div>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
