"use client"

import { useState } from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import FileUpload from "@/components/Fileupload"



export default function FileUploadModal({
  isOpen,
  onClose,
  tableId,
  tableName,
  onUpload,
  files,
  onFileChange,
  monthYear,
  onMonthYearChange
}) {
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async () => {
    try {
      setIsUploading(true)
      await onUpload(tableId)
      onClose()
    } catch (error) {
      console.error("Upload error:", error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload CSV File</DialogTitle>
          <DialogDescription>
            Upload a CSV file for {tableName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="month-year">Select Month Year:</Label>
            <Input 
              id="month-year"
              type="month" 
              value={monthYear} 
              onChange={(e) => onMonthYearChange(e.target.value)} 
            />
          </div>
          
          <div className="space-y-2">
            <Label>Select CSV File (max 50MB)</Label>
            <FileUpload 
              tableId={tableId}
              files={files || []}
              onChange={onFileChange}
              maxSize={5000}
            />
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleUpload}
            disabled={isUploading || !files || files.length === 0}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
