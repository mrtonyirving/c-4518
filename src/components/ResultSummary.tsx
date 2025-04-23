
import React from 'react';

interface ResultSummaryProps {
  query: string;
  isVisible: boolean;
  highlights: {
    articles: string[];
    summary: string;
  }
}

const ResultSummary = ({ query, isVisible, highlights }: ResultSummaryProps) => {
  if (!isVisible) return null;

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in glass-card p-6" aria-live="polite">
      <h3 className="text-xl font-medium mb-2">Query Results</h3>
      <div className="bg-gdpr-primary/10 border border-gdpr-primary/30 rounded-lg p-3 mb-4">
        <p className="text-gdpr-text italic">"{query}"</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-medium mb-2 text-gradient">Relevant GDPR Articles</h4>
          <ul className="list-disc list-inside space-y-1 text-gdpr-muted">
            {highlights.articles.map((article, index) => (
              <li key={index}>{article}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-2 text-gradient">Summary</h4>
          <p className="text-gdpr-text">{highlights.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultSummary;
