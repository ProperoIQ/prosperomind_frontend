import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NavigationTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <Tabs defaultValue="prompts" onValueChange={setActiveTab} className="w-auto">
        <TabsList className="bg-white border rounded-md">
          <TabsTrigger value="prompts" className="px-4 py-2">Chat Bot</TabsTrigger>
          <TabsTrigger value="tables" className="px-4 py-2">Manage Tables</TabsTrigger>
          <TabsTrigger value="dashboard" className="px-4 py-2">Dashboard</TabsTrigger>
          <TabsTrigger value="dictionary" className="px-4 py-2">Data Dictionary</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
