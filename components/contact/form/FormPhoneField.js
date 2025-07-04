'use client';

import { Phone } from 'lucide-react';

export default function FormPhoneField({ phoneValue, countryCodeValue, onChange, error }) {
  const countryCodes = [
    { code: '+91', country: 'India' },
    { code: '+1', country: 'USA/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+61', country: 'Australia' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
  ];

  return (
    <div>
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
        Phone Number{' '}
        <span className="text-red-500" aria-label="required">
          *
        </span>
      </label>
      <div className="flex space-x-3">
        <select
          name="countryCode"
          value={countryCodeValue}
          onChange={onChange}
          className="px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          aria-label="Country code"
        >
          {countryCodes.map(country => (
            <option key={country.code} value={country.code}>
              {country.code} ({country.country})
            </option>
          ))}
        </select>
        <div className="relative flex-1">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phoneValue}
            onChange={onChange}
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors duration-200 ${
              error
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }`}
            placeholder="Enter your phone number"
            aria-describedby={error ? 'phone-error' : undefined}
            aria-invalid={error ? 'true' : 'false'}
          />
        </div>
      </div>
      {error && (
        <p id="phone-error" className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
