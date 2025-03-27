import { Dispatch, useState } from "react"
import { get } from "@/services/utils"



export const fetchData = async (
  key,
  apiKey,
  setMiddlePaneState,
) => {
  setMiddlePaneState((prev) => ({
    ...prev,
    [key]: {
      data: [],
      isLoading: true,
      error: null,
    },
  }))
  get(
    key === "dataManagementTables"
      ? "/main-boards/boards/data-management-table/get_all_tables_with_files"
      : `/main-boards/boards/${apiKey}/`,
  )
    .then((res) => {
      const data = res && res.data
      setMiddlePaneState((prev) => ({
        ...prev,
        [key]: {
          isLoading: false,
          error: null,
          data,
        },
      }))
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      setMiddlePaneState((prev) => ({
        ...prev,
        [key]: {
          data: [],
          isLoading: false,
          error: errRes,
        },
      }))
    })
}

export const useMiddlePane = () => {
  const [middlePaneState, setMiddlePaneState] = useState({
    dataManagementTables: {
      isLoading: true,
      error: null,
      data: [],
    },
    managePrompts: {
      isLoading: true,
      error: null,
      data: [],
    },
    promptsRepository: {
      isLoading: true,
      error: null,
      data: [],
    },
    aiDocumentation: {
      isLoading: true,
      error: null,
      data: [],
    },
    masterSettings: {
      isLoading: true,
      error: null,
      data: [],
    },
    timelineSettings: {
      isLoading: true,
      error: null,
      data: [],
    },
    kpiDefinition: {
      isLoading: true,
      error: null,
      data: [],
    },
    otherParameterDefinitions: {
      isLoading: true,
      error: null,
      data: [],
    },
    prompts: {
      isLoading: true,
      error: null,
      data: [],
    },
  })

  return { middlePaneState, setMiddlePaneState }
}
