import { create } from "zustand"



const initialState = {
  isLoading: true,
  error: null,
  breadCrumbItems: [],
}

export const useCFOBoardsStore = create((set) => ({
  ...initialState,
  updateCFOBoardsStore: (state) => {
    set(state, false)
  },
}))
