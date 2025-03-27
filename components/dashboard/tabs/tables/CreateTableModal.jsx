import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { post } from "@/services/utils";
const CreateTableModal = ({ boardId, isOpen, onClose, onTableCreated }) => {
  const [formData, setFormData] = useState({
    table_name: "",
    table_description: "",
    table_column_type_detail: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = { board_id: boardId, ...formData };
      const response = await post("/main-boards/boards/data-management-table/create", payload);
      onTableCreated(response.data); // Notify parent to enable file upload
      onClose(); // Close modal
    } catch (error) {
      console.error("Error creating table:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Table</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <Input name="table_name" placeholder="Table Name" onChange={handleChange} />
          <Input name="table_description" placeholder="Description" onChange={handleChange} />
          <Input name="table_column_type_detail" placeholder="Column Type" onChange={handleChange} />
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create Table"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTableModal;
