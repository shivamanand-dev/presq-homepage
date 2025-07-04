'use client';

import { User, Mail, Building } from 'lucide-react';

const iconMap = {
  user: User,
  mail: Mail,
  building: Building,
};

export default function FormField({
  id,
  name,
  type = 'text',
  label,
  value,
  onChange,
  error,
  required = false,
  optional = false,
  placeholder,
  icon,
  className = '',
}) {
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}{' '}
        {required && (
          <span className="text-red-500" aria-label="required">
            *
          </span>
        )}
        {optional && <span className="text-gray-400">(Optional)</span>}
      </label>
      <div className="relative">
        {IconComponent && (
          <IconComponent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full ${IconComponent ? 'pl-10' : 'pl-4'} pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors duration-200 ${
            error
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
          placeholder={placeholder}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={error ? 'true' : 'false'}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
