import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, LineChart, Line } from "recharts";


export default function ChartTab({ chart, chartData }) {
    return (
      <div className="border rounded-lg p-4 max-h-[60vh] overflow-auto">
        <h2 className="text-lg font-semibold mb-4 capitalize">
          {chart.chart_type} Chart
        </h2>
        <div className="mb-4 h-[300px]">
          {chart.chart_type === "bar" && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          )}
          {chart.chart_type === "pie" && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#4F46E5"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
          {chart.chart_type === "line" && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4F46E5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
        {chart.insight && chart.insight.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Insights:</h3>
            <ul className="list-disc list-inside space-y-1">
              {chart.insight.map((insight, i) => (
                <li key={i} className="text-sm text-gray-700">
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }