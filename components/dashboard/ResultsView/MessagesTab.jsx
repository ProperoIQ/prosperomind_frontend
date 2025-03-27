export default function MessagesTab({ messages }) {
    return (
      <div className="max-h-[60vh] overflow-auto border rounded p-4">
        <h2 className="text-lg font-semibold mb-4">AI Powered Insights</h2>
        <ul className="space-y-2">
          {messages.map((msg, index) => (
            <li key={index} className="text-sm text-gray-700">
              {msg}
            </li>
          ))}
        </ul>
      </div>
    );
  }