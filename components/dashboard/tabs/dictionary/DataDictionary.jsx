"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useEffect, useState } from "react"
import { getDataDictionary } from "@/services"


export default function DataDictionary({ boardId }) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!boardId) return

    const fetchData = async () => {
      setIsLoading(true)
      try {
        const result = await getDataDictionary(boardId)
        if (result.data) {
          setData(result.data)
        } else {
          setError(result.errRes || "Failed to fetch data dictionary")
        }
      } catch (err) {
        setError("An error occurred while fetching the data dictionary")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [boardId])

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!data || Object.keys(data).length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Data</AlertTitle>
        <AlertDescription>No data dictionary information is available.</AlertDescription>
      </Alert>
    )
  }

  const tableNames = Object.keys(data)
  const defaultTab = tableNames[0]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Data Dictionary</CardTitle>
        <CardDescription>Detailed information about the data structure and content</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={defaultTab}>
          <TabsList className="mb-4 flex flex-wrap">
            {tableNames.map((tableName) => (
              <TabsTrigger key={tableName} value={tableName} className="text-sm">
                {formatTableName(tableName)}
              </TabsTrigger>
            ))}
          </TabsList>

          {tableNames.map((tableName) => (
            <TabsContent key={tableName} value={tableName}>
              <TableView tableData={data[tableName]} tableName={tableName} />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

function TableView({ tableData, tableName }) {
  // If there are multiple arrays in the table data, we'll just use the first one for now
  // This can be expanded to handle multiple tables per tab if needed
  const columns = tableData[0] || []

  return (
    <div className="rounded-md border overflow-auto max-h-[50vh]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Column Name</TableHead>
            <TableHead className="w-[300px]">Description</TableHead>
            <TableHead className="w-[100px]">Type</TableHead>
            <TableHead>Sample Values</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {columns.length > 0 ? (
            columns.map((column, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{column["Column Name"]}</TableCell>
                <TableCell>{column["Description"]}</TableCell>
                <TableCell>{column["Type"]}</TableCell>
                <TableCell className="max-w-[300px] truncate">
                  <div className="tooltip" title={formatSampleValues(column["First 5 Values"])}>
                    {formatSampleValues(column["First 5 Values"])}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                No columns found for this table
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <Card className="w-full animate-pulse h-[70vh]">
      <CardHeader>
        <div className="h-8 w-1/3 bg-gray-300 rounded-md" />
        <div className="h-4 w-1/2 bg-gray-200 rounded-md mt-2" />
      </CardHeader>
      <CardContent>
        <div className="h-10 w-full bg-gray-300 rounded-md mb-4" />
        <div className="space-y-2">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-12 w-full bg-gray-200 rounded-md" />
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
 

function formatTableName(name) {
  // Convert snake_case or kebab-case to Title Case
  return name
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function formatSampleValues(valuesStr) {
  try {
    // Remove the array brackets and single quotes
    const cleanedStr = valuesStr.replace(/^\['|'\]$/g, "").replace(/','|', '/g, ", ")
    return cleanedStr
  } catch (error) {
    return valuesStr
  }
}

