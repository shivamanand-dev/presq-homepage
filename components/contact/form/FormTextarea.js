'use client';

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
  className = '',
}) {
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
