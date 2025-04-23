
import React from 'react';
import { Upload, Search, FileSearch, Network } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Upload className="h-8 w-8" />,
      title: "Upload Annual Report",
      description: "Start by uploading your company's annual report. We accept PDF and Word documents."
    },
    {
      icon: <FileSearch className="h-8 w-8" />,
      title: "Document Analysis",
      description: "Our system analyzes the document to understand your company's organizational structure."
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Ask GDPR Questions",
      description: "Ask specific questions about how GDPR relates to your organization."
    },
    {
      icon: <Network className="h-8 w-8" />,
      title: "Get Visual Insights",
      description: "Receive visual knowledge graph representations showing relevant GDPR articles and entities."
    }
  ];

  return (
    <section id="how-it-works" className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="glass-card p-6 flex flex-col items-center text-center">
              <div className="mb-4 text-gdpr-primary">{step.icon}</div>
              <h3 className="text-xl font-medium mb-2">{step.title}</h3>
              <p className="text-gdpr-muted">{step.description}</p>
              <div className="mt-4 text-gdpr-primary font-bold text-2xl">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
