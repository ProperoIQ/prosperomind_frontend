import { Dispatch, useEffect, useState } from "react"
import { getMainBoardTreeInfo } from "@/services"






export const fetchTreeInfo = async (setBoardState) => {
  const { data, errRes } = await getMainBoardTreeInfo()
  if (data) {
    setBoardState((prev) => ({
      ...prev,
      treeNodes: data,
      isLoading: false,
      error: null,
      selectedTreeItem: null,
      selectedPrompt: null,
      fetchedAt: new Date(),
    }))
  }
  if (errRes) {
    setBoardState((prev) => ({
      ...prev,
      data: [],
      isLoading: false,
      error: errRes,
      selectedTreeItem: null,
      selectedPrompt: null,
    }))
  }
}

export const useBoards = () => {
  const [boardState, setBoardState] = useState({
    mainBoards: [],
    prompts: [],
    executedPrompts: {
      message: [],
      table: { columns: [], data: [] },
      status_code: 0,
      detail: "",
      start_time: "",
      end_time: "",
      duration_seconds: 0,
      charts: [],
    },
    isLoading: true,
    treeNodes: [],
    selectedTreeItem: null,
    selectedPrompt: null,
    fetchedAt: new Date(),
    boardId: null,
  })

  useEffect(() => {
    fetchTreeInfo(setBoardState)
  }, [])

  return { boardState, setBoardState }
}
