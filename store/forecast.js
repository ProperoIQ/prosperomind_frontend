import { create } from "zustand"


export const getInitialState = () => ({
  isLoading: true,
  data: [],
  error: null,
  selectedForecastInfo: null,
  forecastResponse: null,
})

export const useForecastStore = create((set) => ({
  ...getInitialState(),
  updateForecastStore: (state) => {
    set(state, false)
  },
}))
