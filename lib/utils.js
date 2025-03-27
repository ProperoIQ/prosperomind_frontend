/* eslint-disable no-nested-ternary */
import { clsx } from "clsx"
import toast from "react-hot-toast"
import { twMerge } from "tailwind-merge"
import * as XLSX from "xlsx"
import Cookies from "js-cookie"
import { pastelColors } from "./colors"


export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function iterateErrorResponse(obj) {
  if (typeof obj === "string") {
    toast.error(obj, { position: "top-right" })
  } else if (typeof obj === "object") {
    Object.keys(obj).forEach((key) => {
      const value = obj[key]
      toast.error(value, { position: "top-right" })

      if (typeof value === "object" && value !== null) {
        iterateErrorResponse(value)
      }
    })
  }
}

export function formatDateTime(dateInput) {
  const date = new Date(dateInput)
  const n = date.toDateString()
  const time = date.toLocaleTimeString()
  return `${n} ${time}`
}

export function downloadExcel(rows, columns) {
  const ws = XLSX.utils.aoa_to_sheet([
    columns?.map((column) => column.columnName),
    ...rows.map((row) => row.cells?.map((cell) => cell.cellValue)),
  ])

  // Calculate column widths based on content
  const colWidths = columns?.map((_, columnIndex) => {
    const maxContentLength = rows.reduce((max, row) => {
      const { cellValue } = row.cells[columnIndex]
      const contentLength = cellValue ? String(cellValue).length : 0
      return Math.max(max, contentLength)
    }, 0)

    // Add some padding or constant factor to improve readability
    const padding = 5 // You can adjust this value based on your preference

    // Determine the alignment based on column index
    const alignment = columnIndex === 1 ? { horizontal: "left" } : undefined

    // Determine the cell type based on column index
    const cellType = columnIndex === 1 ? "s" : undefined

    return { wch: maxContentLength + padding, s: { alignment, t: cellType } }
  })

  ws["!cols"] = colWidths

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1")

  XLSX.writeFile(wb, "prompt_results.xlsx")
}

export function convertToMonthWords(monthYearString) {
  const month = monthYearString.slice(0, 2)
  const year = monthYearString.slice(2)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const numericMonth = parseInt(month, 10)

  if (numericMonth >= 1 && numericMonth <= 12) {
    const monthName = monthNames[numericMonth - 1]

    return `${monthName} ${year}`
  }
  return "Invalid month"
}

export function getFromCookie(key) {
  const data = Cookies.get(key)
  if (data) {
    return JSON.parse(data)
  }
  return null
}

export function setToCookie(key, payload) {
  Cookies.set(key, JSON.stringify(payload), { path: "/" })
}

export function removeFromCookie(key) {
  Cookies.remove(key)
}

export const getAvatarText = (name) => {
  if (name) {
    const matches = name.match(/(\b\S)?/g)

    if (matches) {
      const cleanedText = matches.join("").match(/(^\S|\S$)?/g)

      if (cleanedText) {
        return cleanedText.join("").toUpperCase()
      }
    }
  }

  return ""
}

export const paginationOptions = {
  styles: {
    pageButtons: {
      buttons: {
        default: {
          color: "grey",
          stroke: "grey",
          backgroundColor: "none",
          border: "none",
          marginTop: "3px",
          borderRadius: "5px",
        },
      },
      activeButton: {
        default: {
          backgroundColor: "#2e72fd",
          border: "none",
          color: "white",
          boxShadow: "rgb(55 55 55 / 17%) 0px 2px 5px 1px",
        },
      },
      actionButtons: { default: { border: "none" } },
      disabledButtons: { visibility: "hidden" },
      firstVisibleButtonOverride: {},
      lastVisibleButtonOverride: {},
    },
  },
  rowsPerPageSelect: false,
  displayNumberOfVisibleRows: false,
  // positions: { pageButtons: { position: "bottom-center" } },
  rowsPerPage: 5,
}

function getRandomPastelColor() {
  const randomIndex = Math.floor(Math.random() * pastelColors.length)
  return pastelColors[randomIndex]
}

export function generateChartDataConfig(data, isMultiAxisLineChart) {
  return {
    labels: data.labels,
    datasets: data.categories?.map((category, index) => {
      const color = getRandomPastelColor()
      return {
        label: category,
        data: isMultiAxisLineChart
          ? data.values?.map((value) => value[index])
          : (data.values?.flat() ),
        backgroundColor: color,
        borderColor: color,
        tension: 0.1 ,
        ...(isMultiAxisLineChart && { yAxisID: index === 0 ? "y-axis-1" : "y-axis-2" }),
      }
    }),
  }
}


export const generateRandomColor = () => {
  const randomRGBA = () => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    const a = 0.8
    return { rgba: `rgba(${r}, ${g}, ${b}, ${a})`, rgb: `rgba(${r}, ${g}, ${b})` }
  }

  const col = randomRGBA()
  const backgroundColor = col.rgba
  const borderColor = col.rgb

  return { backgroundColor, borderColor }
}

export function generateNewChartDataConfig(
  data,
  chartType ,
  isMultiAxisLineChart,
) {
  const categoryColors = data.categories?.map(() => generateRandomColor())
  const datasets = data.categories?.map((category, index) => {
    const color = generateRandomColor()
    const colors = data.values?.flat()?.map(() => generateRandomColor())
    const backgroundColors = colors?.map((clr) => clr.backgroundColor)
    const borderColors = colors?.map((clr) => clr.borderColor)
    let modifiedData = data.values?.map((i) => i[index])

    // Check if all values in the category array are the same
    const isSameValues = data.values?.every((val, i, arr) => val === arr[0])
    // Check if there are zero values in the category array
    const hasZeroValues = modifiedData?.some((val) => val === 0)

    let modifiedBackgroundColor =
      data.categories?.length > 1 ? backgroundColors : color.backgroundColor
    let modifiedBorderColor = data.categories?.length > 1 ? borderColors : color.borderColor

    if (chartType === "line" && !isMultiAxisLineChart) {
      modifiedBackgroundColor = categoryColors[index].backgroundColor
      modifiedBorderColor = categoryColors[index].borderColor
      if (!data.values.some((i) => Array.isArray(i) && i.length === 1)) {
        modifiedData = data.values[index]?.map((i) => (!i ? null : i))
      }
    } else if (chartType === "line" && isMultiAxisLineChart) {
      modifiedBackgroundColor = categoryColors[index].backgroundColor
      modifiedBorderColor = categoryColors[index].borderColor
    } else if (
      chartType === "bar" &&
      data.categories.length > 1 &&
      data.values?.some((i) => Array.isArray(i) && i.length === 1)
    ) {
      modifiedData = data.values[index]
    }

    // If all values are the same or there are zero values, flatten the data
    if (isSameValues || hasZeroValues) {
      modifiedData = data.values.flat()?.map((i) => (!i ? 0 : i))
    }

    return {
      label: category,
      data: modifiedData,
      backgroundColor: modifiedBackgroundColor,
      borderColor: modifiedBorderColor,
      tension: 0.1 ,
      borderJoinStyle: "round",
      ...(isMultiAxisLineChart && { yAxisID: index === 0 ? "y-axis-1" : "y-axis-2" }),
      borderWidth: 1,
    }
  })

  return {
    labels: data.labels,
    datasets,
  }
}
