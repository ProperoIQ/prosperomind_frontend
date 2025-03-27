import { ApiResponse, get, post, put, remove } from "./utils"



const getPrompts = () =>
  get("/main-boards/boards/prompts/")
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

const getPromptById = (promptId) =>
  get(`/main-boards/boards/prompts/${promptId}`)
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

    const getPromptByBoardId = (boardId) => {
      console.log("Fetching prompts for board ID:", boardId);
      return get(`/main-boards/boards/prompts/boards/${boardId}`)
        .then((res) => {
          console.log("Response received:", res.data);
          return { data: res.data };
        })
        .catch((err) => {
          console.error("API Error:", err?.response?.data || err.message);
          return { errRes: err?.response?.data || "Something went wrong" };
        });
    };
    



const createPrompt = (payload) =>
  post("/main-boards/boards/prompts/", payload)
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

const editPrompt = (
  promptId,
  payload,
) =>
  put(`/main-boards/boards/prompts/${promptId}`, payload)
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

const deletePromptById = (promptId)=>
  remove(`/main-boards/boards/prompts`, promptId)
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

const runPrompt = (
  promptText,
  boardId,
  payload,
) =>
  post(
    `/main-boards/boards/prompts/run_prompt?input_text=${promptText}&board_id=${boardId}`,
    payload,
  )
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

const runPrompt2 = (promptText, boardId, mactched_query) =>
  post(`/main-boards/boards/prompts/run_prompt_v2?input_text=${promptText}&board_id=${boardId}&mactched_query=${mactched_query}`)
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })



  const getDataDictionary = ( boardId) =>
      get(`/main-boards/boards/prompts/csv-data/${boardId}`)
        .then((res) => {
          const data = res && res.data
          return { data }
        })
        .catch((err) => {
          const errRes = err?.response?.data || "Something went wrong"
          return { errRes }
        })
export {
  getPrompts,
  createPrompt,
  getPromptById,
  getPromptByBoardId,
  editPrompt,
  deletePromptById,
  runPrompt,
  runPrompt2,
  getDataDictionary
}
