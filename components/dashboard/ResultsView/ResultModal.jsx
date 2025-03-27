import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ImageTab from "./ImageTab";
import TableTab from "./TableTab";
import ChartTab from "./ChartTab";
import MessagesTab from "./MessagesTab";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { get } from "@/services/utils"; 

export default function ResultModal({ isOpen, onClose, result }) {
  console.log(result)
  if (!result) return null;

  const isImageResponse = result.message && result.message.length > 0 && result.message[0].endsWith(".png");
  const chartData = result.table?.data?.map((row) => ({
    name: row[0],
    value: row[1],
  })) || [];

  // Fetch dashboard URL when boardId changes or component mounts
 

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl min-h-[90vh] overflow-y-auto p-2">
        <DialogHeader>
          <DialogTitle>Prompt Results</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue={isImageResponse ? "image" : "table"}>
          <TabsList className="flex border-b mb-4">
            {isImageResponse && <TabsTrigger value="image">Image</TabsTrigger>}
            {result.table?.columns?.length > 0 && <TabsTrigger value="table">Table</TabsTrigger>}
            {result.charts?.length > 0 && <TabsTrigger value="charts">Charts</TabsTrigger>}
            <TabsTrigger value="messages">Insights</TabsTrigger>
          </TabsList>

          {isImageResponse && (
            <TabsContent value="image">
              <ImageTab imageUrl={result.message[0]} />
            </TabsContent>
          )}

          {result.table?.columns?.length > 0 && (
            <TabsContent value="table">
              <TableTab columns={result.table.columns} data={result.table.data} />
            </TabsContent>
          )}

          {result.charts?.length > 0 && (
            <TabsContent value="charts">
              <div className="space-y-8 max-h-[60vh] overflow-auto">
                {result.charts.map((chart, index) => (
                  <ChartTab key={index} chart={chart} chartData={chartData} />
                ))}
              </div>
            </TabsContent>
          )}

          <TabsContent value="messages">
            <MessagesTab messages={result.message} />
          </TabsContent>

          {/* Dashboard Tab */}
          
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}