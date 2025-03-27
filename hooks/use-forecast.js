import { useEffect } from "react"
import { get } from "@/services/utils"
import { UpdateForecastStore, getInitialState, useForecastStore } from "@/store/forecast"


export const fetchForecastData = async (
  updateForecastStore,
  boardId,
) => {
  get(`/main-boards/boards/forecast-response/forecast-response-board-id-consultant/${boardId}`)
    .then((res) => {
      const data = res && res.data

      updateForecastStore({
        data,
        isLoading: false,
        error: null,
        selectedForecastInfo: null,
      })
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      updateForecastStore({
        data: [],
        isLoading: false,
        error: errRes,
        selectedForecastInfo: null,
      })
    })
}

export const useForecast = (boardId) => {
  const { updateForecastStore } = useForecastStore()

  useEffect(() => {
    if (boardId) {
      updateForecastStore(getInitialState())
      fetchForecastData(updateForecastStore, boardId)
    }
  }, [boardId])
}
