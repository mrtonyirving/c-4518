
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import FileUploader from '@/components/FileUploader';
import QueryInput from '@/components/QueryInput';
import ProcessingVisual from '@/components/ProcessingVisual';
import KnowledgeGraph from '@/components/KnowledgeGraph';
import ResultSummary from '@/components/ResultSummary';
import HowItWorks from '@/components/HowItWorks';
import About from '@/components/About';
import Footer from '@/components/Footer';

// Sample data for the knowledge graph visualization
const sampleNodes = [
  { id: 'article5', label: 'Article 5', category: 'article', isHighlighted: true },
  { id: 'article6', label: 'Article 6', category: 'article', isHighlighted: true },
  { id: 'article7', label: 'Article 7', category: 'article' },
  { id: 'article13', label: 'Article 13', category: 'article', isHighlighted: true },
  { id: 'article14', label: 'Article 14', category: 'article', isHighlighted: true },
  { id: 'article15', label: 'Article 15', category: 'article' },
  { id: 'article17', label: 'Article 17', category: 'article' },
  { id: 'dataController', label: 'Controller', category: 'entity', isHighlighted: true },
  { id: 'dataProcessor', label: 'Processor', category: 'entity' },
  { id: 'dataSubject', label: 'Data Subject', category: 'entity', isHighlighted: true },
];

const sampleEdges = [
  { source: 'dataController', target: 'article5', isHighlighted: true },
  { source: 'dataController', target: 'article6', isHighlighted: true },
  { source: 'dataController', target: 'article13', isHighlighted: true },
  { source: 'dataController', target: 'dataProcessor' },
  { source: 'dataSubject', target: 'article13', isHighlighted: true },
  { source: 'dataSubject', target: 'article14', isHighlighted: true },
  { source: 'dataSubject', target: 'article15' },
  { source: 'dataSubject', target: 'article17' },
  { source: 'dataProcessor', target: 'article28' },
  { source: 'article5', target: 'article6', isHighlighted: true },
];

const sampleHighlights = {
  articles: [
    "Article 5 - Principles relating to processing of personal data",
    "Article 6 - Lawfulness of processing",
    "Article 13 - Information to be provided where personal data are collected from the data subject",
    "Article 14 - Information to be provided where personal data have not been obtained from the data subject"
  ],
  summary: "Based on your organization's structure extracted from the annual report, the highlighted GDPR articles are particularly relevant. Your company processes personal data across multiple departments, which triggers obligations under Articles 5 and 6. Additionally, as you collect data both directly and indirectly from data subjects, Articles 13 and 14 outline your specific disclosure requirements."
};

const Index = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<'none' | 'analyzing' | 'mapping' | 'complete'>('none');
  const [showGraph, setShowGraph] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file.name);
    setFileUploaded(true);
  };

  const handleQuerySubmit = (query: string) => {
    setCurrentQuery(query);
    setIsProcessing(true);
    setProcessingStep('analyzing');
    
    // Simulate processing steps with timeouts
    setTimeout(() => {
      setProcessingStep('mapping');
      
      setTimeout(() => {
        setProcessingStep('complete');
        
        setTimeout(() => {
          setIsProcessing(false);
          setShowGraph(true);
          setShowResults(true);
        }, 1000);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16 bg-gradient-to-b from-gdpr-bg to-black">
          <div className="container">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-4 text-gradient">GDPR Knowledge Graph Explorer</h2>
              <p className="text-xl text-gdpr-muted">
                Discover how GDPR applies to your organization by analyzing your annual report
                and visualizing relevant regulatory requirements.
              </p>
            </div>
            
            {!fileUploaded ? (
              <FileUploader onFileUpload={handleFileUpload} />
            ) : (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="bg-gdpr-primary/20 text-gdpr-primary py-2 px-4 rounded-md inline-block mb-6">
                    Annual report uploaded successfully
                  </div>
                  <h3 className="text-2xl font-medium mb-4">What would you like to know about GDPR?</h3>
                </div>
                
                <QueryInput onQuerySubmit={handleQuerySubmit} isDisabled={isProcessing} />
                
                <ProcessingVisual isProcessing={isProcessing} processingStep={processingStep} />
                
                <ResultSummary 
                  query={currentQuery} 
                  isVisible={showResults} 
                  highlights={sampleHighlights} 
                />
                
                <KnowledgeGraph 
                  nodes={sampleNodes} 
                  edges={sampleEdges} 
                  isVisible={showGraph} 
                />
              </div>
            )}
          </div>
        </section>
        
        {/* Informational sections */}
        <HowItWorks />
        <About />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
