"use client"

import {  useRef } from "react"
import { UploadCloud, X, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"



export default function FileUpload({
  tableId,
  files = [],
  onChange,
  maxSize = 50, // Default max size is 50MB
  accept = ".csv",
  className,
}) {
  const inputRef = useRef(null)

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || [])

    // Check file size
    const oversizedFiles = selectedFiles.filter((file) => file.size > maxSize * 1024 * 1024)
    if (oversizedFiles.length > 0) {
      alert(`Some files exceed the maximum size of ${maxSize}MB`)
      return
    }

    // Check file type
    const invalidFiles = selectedFiles.filter((file) => !file.name.toLowerCase().endsWith(".csv"))
    if (invalidFiles.length > 0) {
      alert("Only CSV files are allowed")
      return
    }

    onChange(tableId, selectedFiles)
  }

  const removeFile = (index) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    onChange(tableId, newFiles)

    // Reset input value to allow selecting the same file again
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const triggerFileInput = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer"
        onClick={triggerFileInput}
      >
        <input type="file" ref={inputRef} onChange={handleFileChange} accept={accept} className="hidden" multiple />
        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-2">
          <p className="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500">CSV files only (max {maxSize}MB)</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Selected files:</p>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                  <span className="text-xs text-gray-500">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove file</span>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

