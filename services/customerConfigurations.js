import { ApiResponse, get, post, put, remove } from "./utils"



const getCustomerConfigurations = () =>
  get("/customer-configurations/customer-configurations/")
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

const getCustomerConfigurationById = (configurationId) =>
  get(`/customer-configurations/customer-configurations/${configurationId}`)
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

const createCustomerConfiguration = (payload) =>
  post("/customer-configurations/customer-configurations/", payload)
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

const editCustomerConfiguration = (
  configurationId,
  payload,
) =>
  put(`/customer-configurations/customer-configurations/${configurationId}`, payload)
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

const deleteCustomerConfigurationById = (configurationId) =>
  remove(`/customer-configurations/customer-configurations/`, configurationId)
    .then((res) => {
      const data = res && res.data
      return { data }
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Something went wrong"
      return { errRes }
    })

export {
  getCustomerConfigurations,
  getCustomerConfigurationById,
  createCustomerConfiguration,
  editCustomerConfiguration,
  deleteCustomerConfigurationById,
}
