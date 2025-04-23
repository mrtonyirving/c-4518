
import React, { useEffect, useState } from 'react';

interface ProcessingVisualProps {
  isProcessing: boolean;
  processingStep: 'none' | 'analyzing' | 'mapping' | 'complete';
}

const ProcessingVisual = ({ isProcessing, processingStep }: ProcessingVisualProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isProcessing) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (processingStep === 'analyzing' && prev < 40) return prev + 1;
          if (processingStep === 'mapping' && prev < 90) return prev + 1;
          if (processingStep === 'complete' && prev < 100) return prev + 2;
          return prev;
        });
      }, 50);
    } else {
      setProgress(0);
    }

    return () => clearInterval(interval);
  }, [isProcessing, processingStep]);

  if (!isProcessing) return null;

  return (
    <div className="w-full max-w-3xl mx-auto my-8 animate-fade-in" aria-live="polite">
      <div className="glass-card p-6">
        <h3 className="text-xl font-medium mb-4">
          {processingStep === 'analyzing' && 'Analyzing Document...'}
          {processingStep === 'mapping' && 'Generating Organizational Chart...'}
          {processingStep === 'complete' && 'Analysis Complete'}
        </h3>
        
        <div className="w-full bg-gdpr-bg/50 rounded-full h-2 mb-4" aria-hidden="true">
          <div
            className="bg-gradient-to-r from-gdpr-primary to-gdpr-secondary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="text-gdpr-muted text-sm">
          {processingStep === 'analyzing' && 'Extracting company information and structure...'}
          {processingStep === 'mapping' && 'Mapping organizational hierarchies and detecting entities...'}
          {processingStep === 'complete' && 'Ready to answer your GDPR queries based on your organization'}
        </p>
      </div>
    </div>
  );
};

export default ProcessingVisual;
