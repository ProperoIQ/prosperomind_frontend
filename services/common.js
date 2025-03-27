import { get, post, put, remove, deleteById, deleteAll, getWithReqObj } from "./utils"


const serviceUtil = {
  get,
  post,
  put,
  remove,
  deleteById,
  deleteAll,
  getWithReqObj,
}

export const getServiceMethod = (type) => {
  const serviceMethods = {
    add: serviceUtil.post,
    update: serviceUtil.put,
    delete: serviceUtil.remove,
  }

  return serviceMethods[type]
}
