'use client';

import { Send } from 'lucide-react';

export default function SubmitButton({ isSubmitting, isFormValid }) {
  return (
    <div className="pt-4">
      <button
        type="submit"
        disabled={isSubmitting || !isFormValid}
        className={`w-full flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
          isSubmitting || !isFormValid
            ? 'bg-gray-400 cursor-not-allowed opacity-60'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25'
        }`}
        aria-describedby="submit-button-description"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
            Sending Message...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-3" />
            Send Message
          </>
        )}
      </button>
      <p id="submit-button-description" className="mt-2 text-sm text-gray-500 text-center">
        {!isFormValid
          ? 'Please fill in all required fields to send your message'
          : "We'll respond within 24 hours during business days"}
      </p>
    </div>
  );
}
