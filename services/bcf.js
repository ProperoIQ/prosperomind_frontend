
import { ApiResponse, get, post, put, remove } from "./utils"

const getBCFs = () =>
  get("/main-boards/bcf/")
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

const getBCFById = (mainBoardId) =>
  get(`/main-boards/bcf/${mainBoardId}/bcf`)
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

const createBCF = (payload) =>
  post("/main-boards/bcf/", payload)
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

const editBCF = (boardId, payload) =>
  put(`/main-boards/bcf/${boardId}`, payload)
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

const deleteBCFById = (boardId) =>
  remove(`/main-boards/bcf/`, boardId)
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

export { getBCFs, getBCFById, createBCF, editBCF, deleteBCFById }
