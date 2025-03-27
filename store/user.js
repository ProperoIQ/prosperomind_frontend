import { create } from "zustand"

const initialState = {
  isLoading: true,
  data: null,
  error: null,
}

export const useUserStore = create((set) => ({
  ...initialState,
  updateUserStore: (state) => {
    set(state, false)
  },
}))
