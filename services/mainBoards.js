
import { ApiResponse, get, post, put, remove } from "./utils"

const getMainBoardTreeInfo = () =>
  get("/main-boards/get_all_info_tree")
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

const getMainBoards = () =>
  get("/main-boards/")
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

const getMainBoardById = (mainBoardId) =>
  get(`/main-boards/${mainBoardId}`)
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

const createMainBoard = (payload)=>
  post("/main-boards/", payload)
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

const editMainBoard = (
  mainBoardId,
  payload,
) =>
  put(`/main-boards/${mainBoardId}`, payload)
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

const deleteMainBoardById = (mainBoardId)=>
  remove(`/main-boards/`, mainBoardId)
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

export {
  getMainBoards,
  getMainBoardById,
  createMainBoard,
  editMainBoard,
  deleteMainBoardById,
  getMainBoardTreeInfo,
}
