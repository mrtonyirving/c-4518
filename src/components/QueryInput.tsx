
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface QueryInputProps {
  onQuerySubmit: (query: string) => void;
  isDisabled: boolean;
}

const QueryInput = ({ onQuerySubmit, isDisabled }: QueryInputProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isDisabled) {
      onQuerySubmit(query.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <label htmlFor="gdpr-query" className="sr-only">Enter your GDPR query</label>
        <input
          type="text"
          id="gdpr-query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isDisabled ? "Upload a document first" : "Enter your GDPR query..."}
          disabled={isDisabled}
          className={`w-full bg-gdpr-bg/80 border border-gdpr-border rounded-full px-5 py-3 pr-14 focus:outline-none focus:ring-2 focus:ring-gdpr-primary focus:border-transparent ${isDisabled ? 'cursor-not-allowed opacity-60' : ''}`}
          aria-label="GDPR query input"
        />
        <button
          type="submit"
          disabled={isDisabled || !query.trim()}
          className={`absolute right-2 top-1/2 -translate-y-1/2 bg-gdpr-primary hover:bg-gdpr-primary/90 rounded-full p-2 transition-colors ${(isDisabled || !query.trim()) ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label="Submit query"
        >
          <Search className="h-5 w-5 text-white" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
};

export default QueryInput;
