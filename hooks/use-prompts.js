import { Dispatch, useEffect, useState } from "react"
import { Prompt } from "@/services"
import { ExecutedPrompts } from "@/lib/types"
import { get } from "@/services/utils"


export const fetchPromptsData = (
  setPromptsState,
  apiKey,
  boardId,
) => {
  get(`/main-boards/boards/${apiKey}/${boardId}`)
    .then((res) => {
      const response = res.data
      if (response) {
        setPromptsState((prev) => ({
          ...prev,
          data: response,
          isLoading: false,
          error: null,
          selectedPromptInfo: null,
        }))
      }
    })
    .catch(() => {
      setPromptsState((prev) => ({
        ...prev,
        data: [],
        isLoading: false,
        error: "Please review and modify the prompt with more specifics.",
        selectedPromptInfo: null,
      }))
    })
}

export const getInitialPromptsState = () => ({
  isLoading: true,
  data: [],
  error: null,
  selectedPromptInfo: null,
  executedPrompt: {
    message: [],
    table: null,
    status_code: 0,
    detail: "",
    start_time: "",
    end_time: "",
    duration_seconds: 0,
    charts: [],
  },
})

export const usePrompts = (apiKey, boardId) => {
  const [promptsState, setPromptsState] = useState<PromptsState>(getInitialPromptsState())

  useEffect(() => {
    if (boardId && apiKey) {
      setPromptsState(getInitialPromptsState())
      fetchPromptsData(setPromptsState, apiKey, boardId)
    }
  }, [boardId, apiKey])

  return { promptsState, setPromptsState }
}
