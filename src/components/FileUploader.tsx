
import React, { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

const FileUploader = ({ onFileUpload }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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

  const handleFiles = (files: FileList | null) => {
    if (files && files.length > 0) {
      const selectedFile = files[0];
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      
      if (!allowedTypes.includes(selectedFile.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document (.pdf, .doc, .docx)",
          variant: "destructive"
        });
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB",
          variant: "destructive"
        });
        return;
      }

      setFile(selectedFile);
      onFileUpload(selectedFile);
      
      toast({
        title: "File uploaded successfully",
        description: `${selectedFile.name} has been uploaded`,
      });
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
          <h2 className="text-xl font-semibold mb-2">Upload Annual Report</h2>
          <p className="text-gdpr-muted mb-4">Drag and drop your company's annual report or click to browse</p>
          <p className="text-xs text-gdpr-muted">Supported formats: PDF, DOC, DOCX (Max 10MB)</p>
        </div>

        <input 
          ref={fileInputRef}
          type="file" 
          className="hidden" 
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
          onChange={handleFileInput}
          aria-label="Upload file input"
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
