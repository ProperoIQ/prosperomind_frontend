import { ApiResponse, get, post, put, remove } from "./utils"


const getBoards = () =>
  get("/main-boards/boards/")
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

const getBoardById = (boardId) =>
  get(`/main-boards/boards/${boardId}`)
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

const getBoardsByMainBoardId = (mainBoardId)=>
  get(`/main-boards/boards/${mainBoardId}/boards`)
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

const createBoard = (paylo) =>
  post("/main-boards/boards/", payload)
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

const editBoard = (boardId, payload) =>
  put(`/main-boards/boards/${boardId}`, payload)
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

const deleteBoardById = (boardId) =>
  remove(`/main-boards/boards`, boardId)
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })


const getAllTablesWithFiles = (dataTableId) =>
      get(`/main-boards/boards/data-management-table/get_all_tables_with_files_by_board/${dataTableId}`)
        .then((res) => {
          const data = res?.data || []
          return { data }
        })
        .catch((err) => {
          const errRes = err?.response?.data || "Something went wrong"
          return { errRes }
        })
    
export { getBoards, getBoardById, getBoardsByMainBoardId, createBoard, editBoard, deleteBoardById, getAllTablesWithFiles }
