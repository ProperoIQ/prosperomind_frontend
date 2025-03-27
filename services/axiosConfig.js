import axios, { RawAxiosRequestHeaders } from "axios"
import Cookies from "js-cookie"
import toast from "react-hot-toast"

// Define the base URL
// const baseUrl = process.env.NEXT_PUBLIC_STAGING_API_URL
//const baseUrl = "https://fingpt-customer-p6eyq7s5ma-uc.a.run.app"
//export const baseUrl = "http://127.0.0.1:8000"
export const baseUrl = "https://prosperomind-backend-589889616484.asia-south1.run.app/"


// Create an Axios instance with the base URL
const axiosInstance = axios.create({ baseURL: baseUrl })

// Set common headers for the Axios instance
const setHeaders = (commonHeaders) => {
  axiosInstance.defaults.headers.common = commonHeaders
}

// Add request and response interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    if (
      config.url &&
      config.headers &&
      !config.url.includes("login") &&
      !config.url.includes("signup")
    ) {
      const userInfo = Cookies.get("userInfo")
      if (userInfo) {
        const { accessToken } = JSON.parse(userInfo)
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${accessToken}`
      }
    }
    const element = document.getElementById("circles-with-bar-loader")
    if (element) {
      element.style.display = "flex"
    }
    return config
  },
  (error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
  (response) => {
    const element = document.getElementById("circles-with-bar-loader")
    if (element) {
      element.style.display = "none"
    }
    return response
  },
  (error) => {
    const element = document.getElementById("circles-with-bar-loader")
    if (element) {
      element.style.display = "none"
    }

    if (error?.response?.status === 401) {
      toast.error("Your session has expired")
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setTimeout(() => {
        const win = window
        win.location = "/login"
      }, 2000)
    }

    return Promise.reject(error)
  },
)

export { axiosInstance, setHeaders }
