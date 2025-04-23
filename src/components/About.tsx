
import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 bg-gradient-to-b from-gdpr-bg to-black">
      <div className="container max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-center">About The Project</h2>
        
        <div className="glass-card p-8">
          <p className="mb-4">
            The GDPR Knowledge Graph Explorer is a tool designed to help organizations understand how 
            the General Data Protection Regulation (GDPR) applies to their specific organizational structure.
          </p>
          
          <p className="mb-4">
            By analyzing your company's annual report, our system creates an understanding of your 
            organization's structure and then maps relevant GDPR articles and requirements to your context.
          </p>
          
          <p className="mb-6">
            This tool helps compliance officers, data protection officers, and business leaders quickly 
            identify which aspects of GDPR are most relevant to their operations, without having to 
            manually sift through the entire regulation.
          </p>
          
          <div className="bg-gdpr-primary/10 border border-gdpr-primary/30 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2 text-gdpr-primary">Key Benefits</h3>
            <ul className="list-disc list-inside space-y-2 text-gdpr-muted">
              <li>Visualize GDPR articles relevant to your organization</li>
              <li>Identify compliance requirements specific to your structure</li>
              <li>Save time by focusing on the most relevant regulatory sections</li>
              <li>Better understand the relationships between different GDPR requirements</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
