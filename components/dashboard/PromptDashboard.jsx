"use client";

import { useState, useEffect } from "react";
import { getPromptByBoardId, getAllTablesWithFiles } from "@/services";
import { get } from "@/services/utils"; 
import NavigationTabs from "./NavigationTabs";
import ChatInterface from "./tabs/prompts/ChatInterferance";
import TablesInterface from "./tabs/tables/TablesInterface";
import DataDictionary from "./tabs/dictionary/DataDictionary";

export default function PromptDashboard({ dataInfo }) {
  const [activeTab, setActiveTab] = useState("prompts");
  const [prompts, setPrompts] = useState([]);
  const [board, setBoard] = useState(null);
  const [dashboardUrl, setDashboardUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [boardLoading, setBoardLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!dataInfo?.id) return;
    
    setLoading(true);
    getPromptByBoardId(dataInfo.id)
      .then((res) => setPrompts(res.data || []))
      .catch((err) => console.error("Error fetching prompts:", err))
      .finally(() => setLoading(false));
  }, [dataInfo?.id]);

  useEffect(() => {
    if (activeTab !== "tables" || !dataInfo?.id) return;

    setBoardLoading(true);
    getAllTablesWithFiles(dataInfo.id)
      .then((res) => setBoard(res.data || null))
      .catch((err) => console.error("Error fetching tables:", err))
      .finally(() => setBoardLoading(false));
  }, [activeTab, dataInfo?.id]);

  useEffect(() => {
    if (activeTab !== "dashboard" || !dataInfo?.id) return;

    setIsLoading(true);
    get(`/main-boards/boards/dashboardlinks/${dataInfo.id}`)
      .then((res) => setDashboardUrl(res.data[0]?.link || ""))
      .catch((err) => console.error("Error fetching dashboard link:", err))
      .finally(() => setIsLoading(false));
  }, [activeTab, dataInfo?.id]);

  if (!dataInfo) return null;

  const renderContent = () => {
    if (loading) return <p className="text-lg text-gray-700">Loading prompts...</p>;

    switch (activeTab) {
      case "dashboard":
        return (
          <div className="max-h-[70vh] overflow-auto border rounded p-4 bg-white">
            <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p>Loading dashboard...</p>
              </div>
            ) : dashboardUrl ? (
              <iframe
                src={dashboardUrl}
                width="100%"
                height="500"
                frameBorder="0"
                title="Dashboard"
                allowFullScreen
              ></iframe>
            ) : (
              <p className="text-red-500">No dashboard available.</p>
            )}
          </div>
        );
      case "prompts":
        return <ChatInterface prompts={prompts} boardId={dataInfo.id} />;
      case "tables":
        return <TablesInterface board={board} boardLoading={boardLoading} boardId={dataInfo.id} />;
      case "dictionary":
        return <DataDictionary boardId={dataInfo.id} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#f0f2f5] p-4">
      <div className="max-w-7xl mx-auto">
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
}
