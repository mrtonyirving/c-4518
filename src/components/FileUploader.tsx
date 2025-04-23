
import React, { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';
import { KnowledgeGraphData } from '@/types/knowledge-graph';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

const FileUploader = ({ onFileUpload }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const validateGraphData = (data: any): data is KnowledgeGraphData => {
    if (!data || typeof data !== 'object') return false;
    if (!Array.isArray(data.nodes) || !Array.isArray(data.edges)) return false;
    
    return data.nodes.every((node: any) => (
      typeof node.id === 'string' &&
      typeof node.label === 'string' &&
      typeof node.category === 'string'
    )) && data.edges.every((edge: any) => (
      typeof edge.source === 'string' &&
      typeof edge.target === 'string'
    ));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    handleFiles(files);
  };

  const handleFiles = async (files: FileList | null) => {
    if (files && files.length > 0) {
      const selectedFile = files[0];
      
      if (selectedFile.type !== 'application/json' && !selectedFile.name.endsWith('.json')) {
        toast({
          title: "Invalid file type",
          description: "Please upload a JSON file (.json)",
          variant: "destructive"
        });
        return;
      }

      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive"
        });
        return;
      }

      try {
        const text = await selectedFile.text();
        const jsonData = JSON.parse(text);
        
        if (!validateGraphData(jsonData)) {
          toast({
            title: "Invalid JSON structure",
            description: "The JSON file does not match the required graph data structure",
            variant: "destructive"
          });
          return;
        }

        setFile(selectedFile);
        onFileUpload(selectedFile);
        
        toast({
          title: "File uploaded successfully",
          description: `${selectedFile.name} has been validated and uploaded`,
        });
      } catch (error) {
        toast({
          title: "Error processing file",
          description: "The file contains invalid JSON data",
          variant: "destructive"
        });
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div 
      className={`glass-card w-full max-w-xl mx-auto p-8 transition-all duration-300 ${isDragging ? 'border-gdpr-primary border-dashed bg-gdpr-primary/5' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-label="File upload area"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-gdpr-primary/10 flex items-center justify-center">
          <Upload size={24} className="text-gdpr-primary" aria-hidden="true" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Upload Knowledge Graph</h2>
          <p className="text-gdpr-muted mb-4">Drag and drop your knowledge graph JSON file or click to browse</p>
          <p className="text-xs text-gdpr-muted">Supported format: JSON (Max 5MB)</p>
        </div>

        <input 
          ref={fileInputRef}
          type="file" 
          className="hidden" 
          accept=".json,application/json" 
          onChange={handleFileInput}
          aria-label="Upload JSON file input"
        />
        
        <button 
          onClick={triggerFileInput}
          className="px-6 py-2 rounded-lg bg-gdpr-primary hover:bg-gdpr-primary/90 text-white font-medium transition-colors"
          aria-label="Browse files"
        >
          Browse Files
        </button>

        {file && (
          <div className="w-full mt-4 py-2 px-4 bg-gdpr-primary/10 rounded-lg flex items-center justify-between">
            <span className="truncate max-w-[80%]" title={file.name}>{file.name}</span>
            <span className="text-xs text-gdpr-muted">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
