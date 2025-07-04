'use client';

export default function FormRadioGroup({
  name,
  label,
  value,
  onChange,
  options = [],
  required = false,
  className = '',
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label}{' '}
        {required && (
          <span className="text-red-500" aria-label="required">
            *
          </span>
        )}
      </label>
      <div className="space-y-3">
        {options.map(option => (
          <label key={option.value} className="flex items-center">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
