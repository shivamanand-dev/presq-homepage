'use client';

export default function FormCheckbox({
  name,
  checked,
  onChange,
  error,
  required = false,
  children,
  className = '',
}) {
  return (
    <div className={className}>
      <label className="flex items-start space-x-3">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className={`w-5 h-5 text-blue-600 border-2 rounded focus:ring-blue-500 mt-0.5 ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
          aria-describedby={error ? `${name}-error` : undefined}
          aria-invalid={error ? 'true' : 'false'}
        />
        <span className="text-sm text-gray-700 leading-relaxed">
          {children}{' '}
          {required && (
            <span className="text-red-500" aria-label="required">
              *
            </span>
          )}
        </span>
      </label>
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
