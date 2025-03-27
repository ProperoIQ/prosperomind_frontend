"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { getMainBoardTreeInfo } from "@/services";
import PromptDashboard from "./PromptDashboard";
import { useUserStore } from "@/store/user";

export default function Dashboard() {
  const { data } = useUserStore();
  const [boards, setBoards] = useState({});
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataInfo, setDataInfo] = useState(null); // State for selected board data

  useEffect(() => {
    getMainBoardTreeInfo().then((response) => {
      if (response.data) {
        console.log(response.data);
        const formattedData = response.data.reduce((acc, item) => {
          acc[item.main_board_type] = item.boards
            ? Object.entries(item.boards)
                .map(([id, board]) => ({
                  id,
                  ...board,
                }))
                .filter((board) => board.is_active)
            : [];
          return acc;
        }, {});
        setBoards(formattedData);
      } else {
        console.error("Error:", response.errRes);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-[313px] bg-[#3b1053] flex flex-col">
        {/* Logo */}
        <div className="p-4 flex justify-center">
          <div className="relative w-[200px] h-[120px]">
            <Image
              src="/logo.svg"
              alt="ProsperoIQ Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-1 text-white">
            <li>
              <button
                className="w-full flex items-center px-4 py-3 hover:bg-[#4c1769] transition-colors"
                onClick={() => setAnalysisOpen(!analysisOpen)}
              >
                {analysisOpen ? (
                  <ChevronDown className="h-4 w-4 mr-2" />
                ) : (
                  <ChevronRight className="h-4 w-4 mr-2" />
                )}
                <span className="font-medium">ANALYSIS</span>
                <Plus className="h-4 w-4 ml-auto" />
              </button>
              {analysisOpen && (
                <ul className="pl-10 space-y-1 py-2">
                  {boards["ANALYSIS"]
                    ?.filter((board) =>
                      data?.userName === "Promed"
                        ? board.id === "41"
                        : board.id !== "41"
                    ) // Show only 41 for Promed, hide 41 for others
                    .map((board, index) => (
                      <li key={index}>
                        <button
                          className="block w-full text-left py-2 hover:text-purple-300 transition-colors"
                          onClick={() => setDataInfo(board)}
                        >
                          {board.name}
                        </button>
                      </li>
                    ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm py-2 px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#3b1053] text-white flex items-center justify-center mr-3">
              <span>{data?.userName?.charAt(0) || "U"}</span>
            </div>
            <div>
              <h2 className="text-lg font-medium text-[#3b1053]">
                {data?.userName || "User"}
              </h2>
              <p className="text-sm text-gray-500">
                {data?.email || "user@example.com"}
              </p>
            </div>
          </div>
          <button className="bg-[#3b1053] text-white px-4 py-2 rounded font-medium">
            Logout
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <PromptDashboard dataInfo={dataInfo} />
        </main>
      </div>
    </div>
  );
}
