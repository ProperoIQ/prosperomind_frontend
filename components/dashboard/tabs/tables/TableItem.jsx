import React from "react";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, MoreVertical, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { post } from "@/services/utils";

const TableItem = ({ table, onUpload, onDeleteTable, onDeleteFile, onReplaceFile }) => {
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [downloadError, setDownloadError] = React.useState(null);
  
  const handleFileDownload = async (filePath) => {
    console.log("Original File Path:", filePath);
    setIsDownloading(true);
    setDownloadError(null);
  
    try {
      const encodedFilePath = encodeURIComponent(filePath);
      console.log("Encoded File Path:", encodedFilePath);
  
      const data = await post(`/main-boards/boards/data-management-table/get-file-url?filePath=${encodedFilePath}`);
      console.log("Received Response:", data);

      const fileUrl = data?.data?.url;
  
      if (fileUrl) {
        const decodedUrl = decodeURIComponent(fileUrl);
        console.log("Decoded URL:", decodedUrl);
        window.open(decodedUrl, "_blank");
      } else {
        throw new Error("No URL received from API.");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      setDownloadError("Failed to download file. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };
  
  const confirmDeleteTable = (tableId) => {
    if (window.confirm("Are you sure you want to delete this table? This action cannot be undone.")) {
      onDeleteTable(tableId);
    }
  };

  const confirmDeleteFile = (tableId, fileId) => {
    if (window.confirm("Are you sure you want to delete this file? This action cannot be undone.")) {
      onDeleteFile(tableId, fileId);
    }
  };

  return (
    <div className="mb-6 p-4 border rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold">{table.table_name}</h2>
          <p className="text-gray-600">
            {table.table_description || "No description available"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => table.files.length > 0 ? onReplaceFile(table.id) : onUpload(table.id)}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            {table.files && table.files.length > 0 ? "Replace File" : "Upload File"}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="More options">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => confirmDeleteTable(table.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Table
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {table.files && table.files.length > 0 ? (
        <div className="mt-4">
          <h3 className="font-medium text-gray-700">Uploaded Files:</h3>
          <ul className="mt-2 space-y-2">
            {table.files.map((file) => (
              <li
                key={file.id}
                className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
              >
                <div className="flex items-center">
                  <FileText className="h-4 w-4 text-blue-500 mr-2" />
                  <div
                    onClick={!isDownloading ? () => handleFileDownload(file.file_download_link) : undefined}
                    className={`text-blue-500 hover:underline cursor-pointer ${isDownloading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {file.filename}
                    {isDownloading && <span className="ml-2">(Downloading...)</span>}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    ({file.month_year})
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => confirmDeleteFile(table.id, file.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete file</span>
                </Button>
              </li>
            ))}
          </ul>
          {downloadError && (
            <div className="mt-2 text-sm text-red-500">{downloadError}</div>
          )}
        </div>
      ) : (
        <div className="mt-4 text-gray-500">No files uploaded yet.</div>
      )}
    </div>
  );
};

export default TableItem;
