import { useFileInput } from "./hooks/useFileInput";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { useEffect } from "react";

export function ImageUploader() {
  const {
    fileName,
    error,
    fileInputRef,
    handleFileSelect,
    fileSize,
    clearFile,
  } = useFileInput({
    accept: "image/*",
    maxSize: 5,
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Image Upload</h3>
      <div className="flex gap-4 items-center">
        <Button onClick={() => fileInputRef.current?.click()} variant="outline">
          Select Image
        </Button>
        {fileName && (
          <Button onClick={clearFile} variant="ghost" size="sm">
            Clear
          </Button>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />

      {fileName && (
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Selected: {fileName}</p>
          <p className="text-sm text-muted-foreground">
            Size: {(fileSize / (1024 * 1024)).toFixed(2)}MB
          </p>
        </div>
      )}
      {error && <p className="text-sm text-red-500">Error: {error}</p>}
    </div>
  );
}

export function DocumentUploader({
  onFileSelect,
}: {
  onFileSelect?: (file: File) => void;
}) {
  const { fileName, error, fileInputRef, handleFileSelect, clearFile } =
    useFileInput({
      accept: ".pdf,.doc,.docx,.pptx",
      maxSize: 100,
    });

  useEffect(() => {
    if (fileName && !error) {
      onFileSelect?.(fileInputRef.current?.files?.[0] as File);
      return;
    }
  }, [fileName, error, fileInputRef]);

  return (
    <div className="space">
      <p className="text-xs leading-4 mb-2 text-center">
        Extract Text <br /> From Document:
      </p>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-2 text-center max-w-32",
          "hover:border-brand/50 transition-colors cursor-pointer",
          error && "border-red-500 ",
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        {fileName ? (
          <div className="space-y-2">
            <p className="text-sm font-medium w-full wrap-break-word">
              {fileName}
            </p>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
              variant="ghost"
              size="sm"
            >
              Remove
            </Button>
          </div>
        ) : (
          <p className="text-muted-foreground w-full text-xs">
            Click to upload or drag and drop
            <br />
            PDF, DOC up to 10MB
          </p>
        )}
      </div>

      <input
        type="file"
        accept=".pdf, .doc, .docx,"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />

      {error && <p className="text-sm text-red-500 w-32">Error: {error}</p>}
    </div>
  );
}
export default DocumentUploader;
