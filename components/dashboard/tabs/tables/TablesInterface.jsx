import React, { useState, useRef, useEffect } from "react";
import { post, deleteById } from "@/services/utils"; // Make sure you have a del function in your utils
import { Button } from "@/components/ui/button";
import CreateTableForm from "./CreateTableModal";
import FileUploadModal from "./FileUploadModal";
import DeleteTableModal from "./DeleteTableModal";
import DeleteFileModal from "./DeleteFileModal";
import TableItem from "./TableItem";

export default function TablesInterface({ board, boardLoading, boardId }) {
  const [files, setFiles] = useState({});
  const [monthYear, setMonthYear] = useState(getCurrentMonthYear());
  const [isModalOpen, setModalOpen] = useState(false);
  const [tableList, setTableList] = useState(board || []);
  const [uploadModalTableId, setUploadModalTableId] = useState(null);
  const [deleteTableId, setDeleteTableId] = useState(null);
  const [deleteFileData, setDeleteFileData] = useState(null); // { tableId, fileId }
  const inputRef = useRef(null);

  function getCurrentMonthYear() {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const year = dateObj.getUTCFullYear();
    return `${year}-${String(month).padStart(2, "0")}`;
  }

  const handleTableCreation = async (formData) => {
    try {
      const response = await post(
        `main-boards/boards/data-management-table/create`,
        { board_id: boardId, ...formData }
      );
  
      console.log("Table Creation Response:", response); // Debugging API response
  
      if (!response || !response.data) {
        throw new Error("Invalid API response");
      }
  
      setTableList((prevTableList) => [...prevTableList, response.data]); // Ensure correct data format
      setModalOpen(false);
    } catch (error) {
      console.error("Error creating table:", error);
      alert("Failed to create table.");
    }
  };
  
  

  const handleFileChange = (tableId, selectedFiles) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [tableId]: selectedFiles,
    }));
  };

  const uploadFiles = async (tableId) => {
    if (!files[tableId] || files[tableId].length === 0) {
      alert("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    files[tableId].forEach((file) => formData.append("file", file)); // Ensure the field name is "file"
    formData.append("month_year", monthYear); // Ensure the field name is "month_year"

    try {
      const response = await post(
        `/main-boards/boards/data-management-table/status/upload/${tableId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("API Response:", response); // Debugging
      alert("File uploaded successfully!");

      // Update the tableList state with the new file
      setTableList((prevTableList) => {
        return prevTableList.map((table) => {
          if (table.id === tableId) {
            return {
              ...table,
              files: [...(table.files || []), response.data], // Add the new file to the table's files array
            };
          }
          return table;
        });
      });

      setFiles((prevFiles) => ({
        ...prevFiles,
        [tableId]: [],
      }));
      if (inputRef.current) inputRef.current.value = "";
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Please try again.");
    }
  };

  const deleteFile = async () => {
    if (!deleteFileData) return;

    const { tableId, fileId } = deleteFileData;

    try {
      await deleteById(
        `/main-boards/boards/data-management-table/status/delete`,
        tableId
      );

      // Update the tableList state to remove the deleted file
      setTableList((prevTableList) => {
        return prevTableList.map((table) => {
          if (table.id === tableId) {
            return {
              ...table,
              files: (table.files || []).filter((file) => file.id !== fileId),
            };
          }
          return table;
        });
      });

      alert("File deleted successfully!");
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file.");
    } finally {
      setDeleteFileData(null);
    }
  };

  const deleteTable = async () => {
    if (!deleteTableId) return;

    try {
      // await del(`/main-boards/boards/data-management-table/delete/${deleteTableId}`);

      // Update the tableList state to remove the deleted table
      setTableList((prevTableList) =>
        prevTableList.filter((table) => table.id !== deleteTableId)
      );

      alert("Table deleted successfully!");
    } catch (error) {
      console.error("Error deleting table:", error);
      alert("Failed to delete table.");
    } finally {
      setDeleteTableId(null);
    }
  };

  const openUploadModal = (tableId) => {
    setUploadModalTableId(tableId);
  };

  const closeUploadModal = () => {
    setUploadModalTableId(null);
  };

  const getTableNameById = (id) => {
    const table = tableList.find((t) => t.id === id);
    return table ? table.table_name : "Table";
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      {/* Create Table Modal */}

      <CreateTableForm
        isOpen={isModalOpen}
        onTableCreated={handleTableCreation}
        boardId={boardId}
        onClose={() => setModalOpen(false)}
      />

      {/* File Upload Modal */}
      {uploadModalTableId && (
        <FileUploadModal
          isOpen={!!uploadModalTableId}
          onClose={closeUploadModal}
          tableId={uploadModalTableId}
          tableName={getTableNameById(uploadModalTableId)}
          onUpload={uploadFiles}
          files={files[uploadModalTableId] || []}
          onFileChange={handleFileChange}
          monthYear={monthYear}
          onMonthYearChange={setMonthYear}
        />
      )}

      {/* Delete Table Confirmation Dialog */}
      <DeleteTableModal
        open={!!deleteTableId}
        onOpenChange={(open) => !open && setDeleteTableId(null)}
        deleteTable={deleteTable}
      />

      {/* Delete File Confirmation Dialog */}
      <DeleteFileModal
        open={!!deleteFileData}
        onOpenChange={(open) => !open && setDeleteFileData(null)}
        deleteFile={deleteFile}
      />

      {/* Table List */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Data Management Tables</h1>
        <Button onClick={() => setModalOpen(true)}>Create New Table</Button>
        <Button >Fetch from Zoho</Button>
      </div>

      {boardLoading ? (
        <p className="text-gray-600">Loading board...</p>
      ) : tableList.length > 0 ? (
        tableList.map((table) => (
          <TableItem
            key={table.id}
            table={table}
            onUpload={openUploadModal}
            onDeleteTable={setDeleteTableId}
            onDeleteFile={(tableId, fileId) =>
              setDeleteFileData({ tableId, fileId })
            }
          />
        ))
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600 mb-4">No tables found.</p>
          <Button onClick={() => setModalOpen(true)}>
            Create Your First Table
          </Button>
        </div>
      )}
    </div>
  );
}
